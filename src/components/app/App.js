import React from 'react';
import {useEffect} from 'react';
import Header from "../../containers/Header";
import Feed from "../../containers/Feed";
import ContentList from "../../containers/ContentList";
import SingleContent from "../singleContent/SingleContent";
import Discussions from "../../containers/Discussion";
import Profile from "../../containers/Profile"
import NewNewsForm from "../newNewsForm/NewNewsForm";
import Room from "../room/Room";
import "../../styles/buttons.sass";
import "../../styles/titles.sass";
import './app.sass';
import {Route, Routes} from 'react-router-dom';


function App({isLogged, setUserInfo, login, setAccessToken, logout}) {

	useEffect(() => {
		//load user data
		const token = localStorage.getItem("geckonRefresh");
		
		if (token !== null && token !== "null"){
			var myHeaders = new Headers();
			myHeaders.append("Content-Type", "application/json");

			var raw = JSON.stringify({
				"refreshToken": token
			});

			var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
			};

			fetch("http://localhost:8080/api/v1/auth/token", requestOptions)
				.then(response => response.json())
				.then(result => {
					setAccessToken(result.accessToken);
					return result.accessToken;
				})
				.then(token => {
					if (!isLogged){
						loadUserData(token);
					}
				})
				.then(() => login())
				.catch(error => errorHandler());
		}
	}, []);

	const loadUserData = (token) => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);

        var requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/person/", requestOptions)
                .then(response => response.json())
                .then(result => setUserInfo(result))
                .catch(error => errorHandler());
    }

	const errorHandler = () => {
		logout()
		setUserInfo({
            id: "",
            personName: "",
            photoUrl: "",
            role: "",
            follows: [],
            followers: [],
            likedEvents: [],
            likedTags: [],
        })
        setAccessToken("");
        localStorage.setItem("geckonRefresh", null);
	}

	return (
		<div>
			<Header/>
			<div className="container">
				<Routes>
					<Route path="/" element={<Feed/>}/>
					<Route path="/news/" element={<ContentList type="news" view="full"/>}/>
					<Route path="/news/:slug" exact element={<SingleContent theme="news"/>}/> 
					<Route path="/news/new/" exact element={<NewNewsForm />}/>
					<Route path="/events/:slug" exact element={<SingleContent theme="events"/>}/> 
					<Route path="/events/" element={<ContentList type="events" view="full"/>}/>
					<Route path="/discussions/" element={<Discussions />}/>
					<Route path="/discussion/:slug" exact element={<Room/>}/>
					<Route path="/theme/:slug" exact element={<Discussions type="theme"/>}/>
					<Route path="/profile/" element={<Profile/>}/>
				</Routes>
			</div>
			
		</div>
	);
}

export default App;

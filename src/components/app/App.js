import React from 'react';
import {useEffect} from 'react';
import Header from "../../containers/Header";
import Feed from "../../containers/Feed";
import ContentList from "../../containers/ContentList";
import SingleContent from "../singleContent/SingleContent";
import Discussions from "../discussions/Discussions";
import Profile from "../../containers/Profile"
import NewNewsForm from "../newNewsForm/NewNewsForm";
import "../../styles/buttons.sass";
import "../../styles/titles.sass";
import './app.sass';
import {Route, Routes} from 'react-router-dom';


function App() {

	useEffect(() => {
		//load user data
		console.log("update");
	}, []);

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
					<Route path="/discussions/:slug"/>
					<Route path="/profile/" element={<Profile/>}/>
				</Routes>
			</div>
			
		</div>
	);
}

export default App;

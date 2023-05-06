import React from 'react';
import Header from "../../containers/Header";
import Feed from "../../containers/Feed";
import ContentList from "../../containers/ContentList";
import SingleNews from "../singleNews/SingleNews";
import "../../styles/buttons.sass";
import "../../styles/titles.sass";
import './app.sass';
import {Route, Routes} from 'react-router-dom';

function App() {
	return (
		<div>
			<Header/>
			<div className="container">
				<Routes>
					<Route path="/" element={<Feed/>}/>
					<Route path="/news/" element={<ContentList type="news" view="full"/>}/>
					{/* <Route path="/news/:slug" render={routeProps => (
						<SingleNews routeProps={routeProps}/>
					)}/> */}
					<Route path="/news/:slug" exact element={<SingleNews/>}/> 
					<Route path="/events/" element={<ContentList type="events" view="full"/>}/>
					<Route path="/discussions/"/>
				</Routes>
			</div>
			
		</div>
	);
}

export default App;

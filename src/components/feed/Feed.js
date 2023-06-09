import {useState} from 'react';
import FeedSettings from "../feedSettings/FeedSettings";
import settings from "./settings_300.svg";
import ContentList from "../contentList/ContentList";
import {Link} from "react-router-dom";
import DiscussionForFeed from "../discussionForFeed/DiscussionForFeed";


import "./feed.sass";

const Feed = ({isLogged}) => {
    const [isSettings, setSettings] = useState(false);
    

    let btn = isLogged ? <img src={settings} alt="settings" className="top__settings" onClick={() => setSettings(true)}/> : null;

    return(
        <div className="main-block">
            
            <FeedSettings setSettings={setSettings} isSettings={isSettings}/>
            <div className="top">
                <div className="top__wrapper">
                    <h1 className="top__title">Лента</h1>
                    {/* {btn} */}
                </div>
            </div>
            <div className="news">
                <Link to="/news/" className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="news" view="mini"/>
                <div className="feed__btn">
                    <Link to="/news/" className="btn">К новостям</Link>
                </div>
            </div>
            <div className="events">
                <Link to="/events/" className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="events" view="mini"/>
                <div className="feed__btn">
                    <Link to="/events/" className="btn">К мероприятиям</Link>
                </div>
            </div>
            <div className="disscussions">
                <Link to="/discussions/" className="content__title" ><h2>Интересные обсуждения</h2></Link>
                <DiscussionForFeed/>
                <div className="feed__btn">
                    <Link to="/discussions/" className="btn">К обсуждениям</Link>
                </div>
            </div>
        </div>
    )
}

export default Feed;

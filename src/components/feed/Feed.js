import settings from "./settings.svg";
import "./feed.sass";
import ContentList from "../contentList/ContentList";
import {Link} from "react-router-dom";
import DiscussionForFeed from "../discussionForFeed/DiscussionForFeed";

const Feed = ({isLogged}) => {
    //на деплое убрать !
    let btn = !isLogged ? <img src={settings} alt="settings" className="top__settings"/> : null;

    return(
        <div>
            <div className="top">
                <div className="top__wrapper">
                    <h1 className="top__title">Лента</h1>
                    {btn}
                </div>
            </div>
            <div className="news">
                <Link to="/news/" className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="news" view="mini"/>
            </div>
            <div className="events">
                <Link to="/events/" className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="events" view="mini"/>
            </div>
            <div className="disscussions">
                <Link to="/discussions/" className="content__title" ><h2>Интересные обсуждения</h2></Link>
                <DiscussionForFeed/>
            </div>
        </div>
    )
}

export default Feed;

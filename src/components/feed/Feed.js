import settings from "./settings_fill.svg";
import "./feed.sass";
import ContentList from "../contentList/ContentList";
import {Link} from "react-router-dom";

const Feed = ({isLogged}) => {

    //на деплое убрать !
    let btn = !isLogged ? <img src={settings} alt="settings" className="top__settings"/> : null;

    return(
        <div className="container">
            <div className="top">
                <div className="top__wrapper">
                    <h1 className="top__title">Лента</h1>
                    {btn}
                </div>
            </div>
            <div className="news">
                <Link 
                    className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="news"/>
            </div>
            <div className="events">
                <Link 
                    className="content__title" ><h2>Последние новости</h2></Link>
                <ContentList type="events"/>
            </div>
            <div className="disscussions">

            </div>
        </div>
    )
}

export default Feed;

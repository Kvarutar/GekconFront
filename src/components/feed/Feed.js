import settings from "./settings_fill.svg";
import "./feed.sass";
import NewsList from "../newsList/NewsList";

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
                <NewsList />
            </div>
            <div className="events">

            </div>
            <div className="disscussions">

            </div>
        </div>
    )
}

export default Feed;

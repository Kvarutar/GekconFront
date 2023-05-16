import {useState, useEffect} from 'react';
import settings from "./settings.svg";
import SortPanel from "../../containers/SortPanel";
import ContentList from "../contentList/ContentList";
import "./profile.sass";

const Profile = ({isLogged, userData}) => {

    const [data, setData] = useState([]);
    const {id, personName, photoUrl, role, follows, likedEvents, likedTags} = userData;

    let page = 0;
    let newsPerPage = 9;

    // useEffect(() => {
    //     //store subscribe?
    //     }, [userData])

    const themeMap = {
        "news": "Новости",
        "events": "События",
        "discussions": "Обсуждения",
        "friends": "Друзья",    
    }   

    const content = () => {
        let mainBlock = <ContentList type="news" view="mini" profileData={data}/>

        return(
            <div className="profile main-block">
                <div className="profile__top">
                    <div className="profile__top--info">
                        <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="profile image"/>
                        <div className="profile__top--info__descr">
                            <h2>{personName}</h2>
                        </div>
                    </div>
                    <img src={settings} alt="settings" className="profile__top--settings"/>
                </div>
                <div className="profile__main">
                    <SortPanel sortList={themeMap} theme="profile" className="profile__main--filter"/>
                    {mainBlock}
                </div>
            </div>
        )
    }

    return(
        content()
    )
}

export default Profile;
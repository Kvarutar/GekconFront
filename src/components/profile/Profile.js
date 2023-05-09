import {useState, useEffect} from 'react';

import settings from "./settings.svg";
import SortPanel from "../../containers/SortPanel";

const Profile = ({isLogged, userData, category}) => {

    let {id, personName, photoUrl, role, follows, likedEvents, likedTags} = userData;

    const themeMap = {
        "news": "Новости",
        "events": "События",
        "discussions": "Обсуждения",
        "friends": "Друзья",    
    }

        // useEffect(() => {
        //     //check if user logged
        // })

        

    const content = () => {

        return(
            <div className="profile">
                <div className="profile__top">
                    <div className="profile__top--info">
                        <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="profile image"/>
                        <div className="profile__top--info__descr">
                            <h2>{personName}</h2>
                        </div>
                    </div>
                    <img src={settings} alt="settings"/>
                </div>
                <div className="profile__main">
                    <SortPanel sortList={themeMap} theme="profile"/>
                </div>
            </div>
        )
    }

    return(
        content()
    )
}

export default Profile;
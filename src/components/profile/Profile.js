import {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import settings from "./settings_300.svg";
import SortPanel from "../../containers/SortPanel";
import ContentList from "../contentList/ContentList";
import "./profile.sass";

const Profile = ({isLogged, userData, setUserInfo, logout, setAccessToken, profileCategory}) => {

    const [data, setData] = useState([]);
    const [isSettings, setSettings] = useState(false);
    const {id, personName, photoUrl, role, follows, likedEvents, likedTags} = userData;

    const navigate = useNavigate();

    let page = 0;
    let newsPerPage = 9;

    // useEffect(() => {
    //     //store subscribe?
    //     }, [userData])

    const themeMap = {
        "news": "Новости",
        "events": "События",
        "discussions": "Обсуждения", 
    }   

    const logoutHandler = () => {
        logout();
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
        navigate("/")
    }

    const content = () => {
        let mainBlock = <ContentList type={profileCategory} view="mini" profileData={data}/>

        return(
            <div className="profile main-block">
                <div className="profile__top">
                    <div className="profile__top--info">
                        <img src="https://sun9-58.userapi.com/impf/c834202/v834202358/267fc/VeIG15_L8sU.jpg?size=500x500&quality=96&sign=48455b39ea3dbf99fd00a06a27f1a76f&type=album" alt="profile image"/>
                        <div className="profile__top--info__descr">
                            <h2>{personName}</h2>
                        </div>
                    </div>
                    {/* <img src={settings} onClick={() => setSettings(true)} alt="settings" className="profile__top--settings"/> */}
                    <button className="btn" onClick={() => logoutHandler()}>Выйти</button>
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
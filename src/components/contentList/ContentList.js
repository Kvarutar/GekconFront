import { useState, useEffect, useCallback } from 'react';
import Spinner from "../spinner/Spinner";
import 'react-calendar/dist/Calendar.css';
import "./contentList.sass";
import ContentItem from "../contentItem/ContentItem";
import { v4 as uuidv4 } from 'uuid';

import {Link, useLinkClickHandler} from 'react-router-dom';
import SearchPanel from "../../containers/SearchPanel";



const ContentList = ({type, view, newsCategory, profileData, profileNewsCategory, likedEvents, likedTags, eventsCategory, isLogged}) => {
    const [data, setData] = useState([]),
          [isLoading, setLoading] = useState(true),
          [date, setDate] = useState(new Date()),
          [isCalendar, setIsCalendar] = useState(false),
          [imgSize, setSize] = useState([]),
          [searchPrompt, setPrompt] = useState(""),
          [town, setTown] = useState("");
          

    let contentCount;
    let contentPage = 0;

    const newsMiniSize = ["469", "232", "295"];
    const newsMaxSize = ["360", "450", "650"];
    const eventsMiniSize = ["360", "480", "650"];
    const eventsMaxSize = ["360", "400", "700"];

    function addMonths(date, months) {
        const dateCopy = new Date(date);

        dateCopy.setMonth(dateCopy.getMonth() + months, 0);
        
        return dateCopy;
    }

    useEffect(() => {
        setLoading(true);

        if(type === "news"){
            if (view === "mini"){
                setSize(newsMiniSize);
            }else{
                setSize(newsMaxSize);
            }
        }else if (type === "events"){
            if (view === "mini"){
                setSize(eventsMiniSize);
            }else{
                setSize(eventsMaxSize);
            }
        }
        
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(getPath(contentPage), requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [type, view, newsCategory, date, eventsCategory])

    function getPath(page, name = searchPrompt){
        let url;
        if(profileData === null){
            contentCount = 9;
            contentCount = 8;
            switch(profileNewsCategory){
                case "news":
                    url = `http://localhost:8080/api/v1/news/with?page=${page}&news_per_page=${contentCount}`;
    
                    if (likedTags.length != 0){
                        likedTags.forEach(el => {
                            url += "&tags=" + el;
                        })
                    }else{
                        url = `http://localhost:8080/api/v1/news/?page=${page}&news_per_page=${contentCount}`
                    }
                    
                    break;
    
                case "events":
                    //new method in api(find all by slug list);
                    break;
    
                case "discussion":
                    //new field in person model
                    break;
                case "friends":
                    //new method in person service
            }
        }else{
            if (type === "news"){
                contentCount = 9;
                contentPage = 0;
                url = `http://localhost:8080/api/v1/news/?page=${page}&news_per_page=${contentCount}`;
    
                if (newsCategory !== "all" && newsCategory !== undefined) {
                    url += `&theme=${newsCategory}`
                }
                
                if (name !== null || name !== ""){
                    url += `&name=${name}`
                }
            }else if (type === "events"){
                contentCount = 8;
                contentPage = 0;
                
                let end = new Intl.DateTimeFormat('en-US').format(addMonths(date, 1));
                let start = new Intl.DateTimeFormat('en-US').format(addMonths(date, 0));
    
                if(view == "full"){
                    url = `http://localhost:8080/api/v1/events/?page=${page}&events_per_page=${contentCount}&start=${start}&end=${end}`;
                }else{
                    url = `http://localhost:8080/api/v1/events/?page=${page}&events_per_page=${contentCount}`;
                }

                //console.log(eventsCategory);

                if(eventsCategory !== "all"){
                    url += `&town=${eventsCategory}`
                }
                if (name !== null || name !== ""){
                    url += `&name=${name}`
                    //console.log(name);
                }
            }
        }

        return url
    }

    function loadMore(){
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        contentPage++;
        fetch(getPath(contentPage), requestOptions)
            .then(response => response.json())
            .then(result => setData([...data, ...result]))
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));
    }

    function loadByTitle(prompt){
        console.log(getPath(contentPage, prompt));
        setPrompt(prompt);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(getPath(contentPage, prompt), requestOptions)
            .then(response => response.json())
            .then(result => setData([...result]))
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));
    }

    const cleanUpData = () => {
        setData([]);
        setLoading(true);
        setIsCalendar(false);
        setSize([]);
        setPrompt("");
        setTown("");
    }

    const themeMap = {
        "all": "Все",
        "games": "Игры",
        "comics": "Комиксы",
        "films": "Фильмы",
        "cosplay": "Косплей"     
    }

    const eventsThemeMap = {
        "all": "Все",
        "town": "Город",
        "date": "Дата"
    }

    let sizeCopy;

    const content = data.map((el, i) => {
        if(sizeCopy === undefined || sizeCopy.length === 0){
            sizeCopy = [...imgSize];
        }
        let zise = Math.floor(Math.random() * sizeCopy.length);

        let tmp = sizeCopy[zise];
        sizeCopy.splice(zise, 1);
        
        
        return <ContentItem el={el} type={type} key={uuidv4()} themeMap={themeMap} i={i} size={tmp}/>
    })

    const switchCalendar = () => {
        setIsCalendar(!isCalendar)
    }

    

    function setNewDate(value){
        setDate(value);
        setIsCalendar(!isCalendar);
    }

    let linkText = "";
    let linkHref = "";
    let linkClass = "";
    if (view === "full"){
        if (type === "news"){
            linkText = "новость"
            linkHref = "/news/new"
        }else if (type === "events"){
            linkText = "мероприятие"
            linkHref = "/event/new"
        }

        if (!isLogged){
            linkClass = "btn_disabled";
        }
    }

    const linkClickHandler = (e) => {
        if (!isLogged){
            e.preventDefault();
        }
    }
    

    let titleText =  type == "news" ? "Новости" : "Мероприятия";
    let title = view == "mini" ? null : <div className="content__title--wrapper"><h1 className="content__title content__title_full">{titleText}</h1><Link className={`btn ${linkClass}`} to={linkHref} onClick={(e) => linkClickHandler(e)}>Создать {linkText}</Link></div>;
    let endContent = isLoading ? <Spinner/> : <div className={`content__wrapper ${type}__wrapper`}>{content}</div>;
    let panel = (type == "news" && view == "full") ?  <SearchPanel themeMap={themeMap} type={type} onSearch={loadByTitle}/> 
                : (type == "events" && view == "full") ? <SearchPanel themeMap={eventsThemeMap} type={type} onSearch={loadByTitle} isCalendar={isCalendar} switchCalendar={switchCalendar}  date={date} setNewDate={setNewDate}/>  : null;

    let classList = view == "mini" ? "" : "main-block"
    let moreBtn = (view === "full" && data.length === 9) ? <div className="content__more"><button className="btn" onClick={loadMore}>Больше</button></div> : null;

    
    return(
        <div className={classList}>
            <div>
                {title}
                {/* <Link to={"/news/new"} className="btn">Создать новость</Link> */}
            </div>
            {panel}
            {endContent}
            {moreBtn}
        </div>
    )
}

export default ContentList;
import { useState, useEffect, useCallback } from 'react';
import Spinner from "../spinner/Spinner";
import 'react-calendar/dist/Calendar.css';
import "./contentList.sass";
import ContentItem from "../contentItem/ContentItem";
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';
import {Link} from 'react-router-dom';
import SearchPanel from "../searchPanel/SearchPanel";

import calendarIcon from './calendar_fill.svg';

const ContentList = ({type, view, newsCategory, profileData, profileNewsCategory, likedEvents, likedTags}) => {
    const [data, setData] = useState([]),
          [isLoading, setLoading] = useState(true),
          [date, setDate] = useState(new Date()),
          [isCalendar, setIsCalendar] = useState(false),
          [imgSize, setSize] = useState([]);
          

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

        let url;
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        if(profileData === null){
            contentCount = 9;
            contentCount = 8;
            switch(profileNewsCategory){
                case "news":
                    url = `http://localhost:8080/api/v1/news/with?page=${contentPage}&news_per_page=${contentCount}`;
    
                    if (likedTags.length != 0){
                        likedTags.forEach(el => {
                            url += "&tags=" + el;
                        })
                    }else{
                        url = `http://localhost:8080/api/v1/news/?page=${contentPage}&news_per_page=${contentCount}`
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
                url = `http://localhost:8080/api/v1/news/?page=${contentPage}&news_per_page=${contentCount}`;
    
                if (newsCategory !== "all" && newsCategory !== undefined) {
                    url += `&theme=${newsCategory}`
                }
            }else if (type === "events"){
                contentCount = 8;
                contentPage = 0;
                
                let end = new Intl.DateTimeFormat('en-US').format(addMonths(date, 1));
                let start = new Intl.DateTimeFormat('en-US').format(addMonths(date, 0));
    
                if(view == "full"){
                    url = `http://localhost:8080/api/v1/events/?page=${contentPage}&events_per_page=${contentCount}&start=${start}&end=${end}`;
                }else{
                    url = `http://localhost:8080/api/v1/events/?page=${contentPage}&events_per_page=${contentCount}`;
                }
            }
        }

        fetch(url, requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [type, view, newsCategory, date])

    const cleanUpData = () => {
        setData([]);
        setLoading(true);
        setIsCalendar(false);
        setSize([]);
    }

    const themeMap = {
        "all": "Все",
        "games": "Игры",
        "comics": "Комиксы",
        "films": "Фильмы",
        "cosplay": "Косплей"     
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

    const datePanel = (
        <div className = "date">
            <div className="date__left date-item">
                <h5>{date.toLocaleString('default', {month: 'long', year: 'numeric' })}</h5>
            </div>
            <div className="date__right date-item">
                <img src={calendarIcon} alt="calendar" onClick={() => switchCalendar()}/>
                <Calendar 
                    view="year" 
                    className={`date__calendar ${isCalendar ? "date__calendar_active" : "" }`}
                    onClickMonth={(value) => setNewDate(value)}
                ></Calendar>
            </div>
        </div>
    )

    function setNewDate(value){
        setDate(value);
        setIsCalendar(!isCalendar);
    }

    let titleText =  type == "news" ? "Новости" : "Мероприятия";
    let title = view == "mini" ? null : <h1 className="content__title content__title_full">{titleText}</h1>;
    let endContent = isLoading ? <Spinner/> : <div className={`content__wrapper ${type}__wrapper`}>{content}</div>;
    let panel = (type == "news" && view == "full") ?  <SearchPanel themeMap={themeMap} type={type}/> : (type == "events" && view == "full") ? datePanel : null;
    let classList = view == "mini" ? "" : "main-block"

    
    return(
        <div className={classList}>
            <div>
                {title}
                {/* <Link to={"/news/new"} className="btn">Создать новость</Link> */}
            </div>
            {panel}
            {endContent}
        </div>
    )
}

export default ContentList;
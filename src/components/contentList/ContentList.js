import { useState, useEffect } from 'react';
import Spinner from "../spinner/Spinner";
import 'react-calendar/dist/Calendar.css';
import "./contentList.sass";
import ContentItem from "../contentItem/ContentItem";
import SortPanel from "../../containers/SortPanel";
import { v4 as uuidv4 } from 'uuid';
import Calendar from 'react-calendar';

import calendarIcon from './calendar_fill.svg';

const ContentList = ({type, view, newsCategory}) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [date, setDate] = useState(new Date());
    const [isCalendar, setIsCalendar] = useState(false);

    let contentCount;
    let contentPage = 0;

    function addMonths(date, months) {
        const dateCopy = new Date(date);

        dateCopy.setMonth(dateCopy.getMonth() + months, 0);
        
        return dateCopy;
    }

    useEffect(() => {
        setLoading(true);

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let url;
        
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
    }

    const themeMap = {
        "all": "Все",
        "games": "Игры",
        "comics": "Комиксы",
        "films": "Фильмы",
        "cosplay": "Косплей"     
    }

    const content = data.map(el => {
        return <ContentItem el={el} type={type} key={uuidv4()} themeMap={themeMap}/>
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
    let panel = (type == "news" && view == "full") ?  <SortPanel sortList={themeMap} theme={type}/> : (type == "events" && view == "full") ? datePanel : null;

    

    return(
        <div>
            {title}
            {panel}
            {endContent}
        </div>
    )
}

export default ContentList;
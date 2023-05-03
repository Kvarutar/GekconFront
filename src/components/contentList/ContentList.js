import { useState, useEffect } from 'react';
import clock from "./clock_fill.svg";
import location from "./location_fill.svg"
import {Link} from "react-router-dom";
import Spinner from "../spinner/Spinner";
import "./contentList.sass";

const ContentList = ({type}) => {
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {

        console.log(type);

        setLoading(true);
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let url;
        
        if (type === "news"){
            url = "http://localhost:8080/api/v1/news/?page=0&news_per_page=9";
        }else if (type === "events"){
            url = "http://localhost:8080/api/v1/events/?page=0&events_per_page=8";
        }

        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => setData(result))
        .then(setLoading(false))
        .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [])

    const cleanUpData = () => {
        setData([]);
    }

    let classType = type === "news" ? "news" : "events";

    const content = data.map(el => {

        let link = "";
        let rawDate = "";

        let id, dateOfCreation, duration, title, mainUrl, slug, descr, imgUrl, timeDate, address, town, metro;

        if (type === "news"){
            ({id, dateOfCreation, duration, title, mainUrl, slug} = el);
            link = `/articles/${slug}`;
            rawDate = dateOfCreation;
        }else if (type === "events"){
            ({id, descr, title, imgUrl, timeDate, address, town, metro, slug} = el);
            link = `/events/${slug}`;
            rawDate = timeDate
        }

        const date = new Date(Date.parse(rawDate)).toLocaleString('default', {month: 'long', day: 'numeric' }),
              timeBlock = type === "news" ? <div><img src={clock} alt="clock"/><h5>{duration}</h5></div> : <div><h5 className="town">{town}</h5><img src={location} alt="clock"/><h5>{address}</h5></div>
              
        let descrBlock = type === "news" ? null : <p className="events-item__text--descr">{descr}</p>;
        
        return(
            <Link to={link} className={`content-item ${classType}-item`} key={id}>
                <div className={`content-item__img ${classType}-item__img`}>
                    <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="news image"/>
                </div>
                <div className={`content-item__text ${classType}-item__text`}>
                    <div className={`content-item__text--time ${classType}-item__text--time`}>
                        <h5>{date}</h5>
                        {timeBlock}
                    </div>
                    <h4 className={`content-item__text--title ${classType}-item__text--title`}>{title}</h4>
                    {descrBlock}
                </div>
            </Link>
        )
    })

    let endContent = isLoading ? <Spinner/> : content;

    return(
        <div className={`content__wrapper ${classType}__wrapper`}>
            {endContent}
        </div>
    )
}

export default ContentList;
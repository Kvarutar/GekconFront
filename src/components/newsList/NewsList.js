import { useState, useEffect } from 'react';
import clock from "./clock_fill.svg";
import {Link} from "react-router-dom";
import Spinner from "../spinner/Spinner";

const NewsList = () => {
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://localhost:8080/api/v1/news/?page=0&news_per_page=2", requestOptions)
        .then(response => response.json())
        .then(result => setNewsData(result))
        .then(setLoading(false))
        .catch(error => console.log('error', error));

        return () => {
            cleanUpNews();
        }
    }, [])

    const cleanUpNews = () => {
        setNewsData([]);
    }

    const content = newsData.map(el => {
        let{id, dateOfCreation, duration, title, mainUrl, slug} = el;

        const date = new Date(Date.parse(dateOfCreation)).toLocaleString('default', {month: 'long', day: 'numeric' }),
              link = `/articles/${slug}`;
        
        return(
            <Link to={link} className="news-item" key={id}>
                <img src={mainUrl} alt="news image" className="news-item__img"/>
                <div className="news-item__text">
                    <div className="news-item__text--time">
                        <h5>{date}</h5>
                        <div>
                            <img src={clock} alt="clock"/>
                            <h5>{duration}</h5>
                        </div>
                    </div>
                    <h4 className="news-item__text--title">{title}</h4>
                </div>
            </Link>
        )
    })

    let endContent = isLoading ? <Spinner/> : content;

    return(
        <div className="news__wrapper">
            {endContent}
        </div>
    )
}

export default NewsList;
import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import heart from "./favorite.svg";
import Spinner from "../spinner/Spinner";
import { v4 as uuidv4 } from 'uuid';
import ContentItem from "../contentItem/ContentItem";


const SingleNews = () => {
    let [newsData, setData] = useState([]);
    let [isLoading, setLoading] = useState(true);
    let [similarData, setSimilar] = useState([]);
    let { slug } = useParams();

    useEffect(() => {
        setLoading(true);

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        fetch(`http://localhost:8080/api/v1/news/${slug}`, requestOptions)
        .then(response => response.json())
        .then(result => loadSimilar(result))
        // .then(result => setData(result))
        // .then(res => console.log(res))
        .then(setLoading(false))
        .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [slug])

    const cleanUpData = () => {
        setData([]);
        setLoading(true);
        setSimilar([]);
    }

    const loadSimilar = (data) => {
        setData(data);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let url = "http://localhost:8080/api/v1/news/with?page=0&news_per_page=4";

        data.tags.forEach(el => {
            url += `&tags=${el.slug}`; 
        })
          
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(result => {
            let index = result.filter(el => el.slug != data.slug);
            setSimilar(index);
        })
        .catch(error => console.log('error', error));
    }

    const content = () => {
        let {author, dateOfCreation, theme, duration, title, mainUrl, slug, content, tags} = newsData;

        if (content != undefined){
            let pageContent = content.map(el => newsContent(el));

            let dateFormatter = new Intl.DateTimeFormat("ru");
            let date = dateFormatter.format(new Date(dateOfCreation));

            let timeFormatter = new Intl.DateTimeFormat("ru", {
                hour: "numeric",
                minute: "numeric"
              });
            let time = timeFormatter.format(new Date(dateOfCreation));

            return(
                <div className="news">
                    <h1 className="news__title">{title}</h1>
                    <div className="news__meta">
                        <div className="news__meta--info">
                            <h5>{date}</h5>
                            <h5>{time}</h5>
                            <h5>{author}</h5>
                        </div>
                        <img src={heart} alt="favorite"/>
                    </div>
                    <div className="news__content">
                        {pageContent}
                    </div>
                </div>
            )
        }
    }

    const newsContent = (element) => {
        let {type, text, url} = element;

        if (type === "text"){
            return(
                <p className="news__content-text" key={uuidv4()} dangerouslySetInnerHTML={{__html:text}}></p>
            )
        }else if (type === "image"){
            return(
                // <img src={url} className="news__content-img"></img>
                <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" className="news__content-img" key={uuidv4()}></img>
            )
        }
    }

    const themeMap = {
        "all": "Все",
        "games": "Игры",
        "comics": "Комиксы",
        "films": "Фильмы",
        "cosplay": "Косплей"     
    }

    const similar = similarData.map(el => {
        return <ContentItem key={uuidv4()} el={el} type="news" themeMap={themeMap}/>
    })

    let endContent = isLoading ? <Spinner/> : content();
    return(
        <div>
            {endContent}
            <div className={`content__wrapper news__wrapper`}>{similar}</div>
        </div>
    )
}  

export default SingleNews;
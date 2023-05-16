import {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import Spinner from "../spinner/Spinner";
import { v4 as uuidv4 } from 'uuid';
import ContentItem from "../contentItem/ContentItem";
import "./singleContent.sass";
import SingleItemContent from "../singleItemContent/SingleItemContent";


const SingleContent = ({theme}) => {
    let [contentData, setData] = useState([]);
    let [isLoading, setLoading] = useState(true);
    let [similarData, setSimilar] = useState([]);
    let { slug } = useParams();
    const [isClick, setClick] = useState(false);

    const newsMiniSize = ["469", "232", "295"];

    useEffect(() => {
        setLoading(true);

        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        if (theme === "news"){
            fetch(`http://localhost:8080/api/v1/news/${slug}`, requestOptions)
            .then(response => response.json())
            .then(result => loadSimilar(result))
            .then(setLoading(false))
            .catch(error => console.log('error', error));
        }else if (theme === "events"){
            fetch(`http://localhost:8080/api/v1/events/${slug}`, requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .then(setLoading(false))
            .catch(error => console.log('error', error));
        }

        return () => {
            cleanUpData();
        }
    }, [slug, theme])

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

        let url = "http://localhost:8080/api/v1/news/with?page=0&news_per_page=3";

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

    const themeMap = {
        "all": "Все",
        "games": "Игры",
        "comics": "Комиксы",
        "films": "Фильмы",
        "cosplay": "Косплей"     
    }

    let sizeCopy;

    const similar = similarData.map((el, i) => {
        if(sizeCopy === undefined || sizeCopy.length === 0){
            sizeCopy = [...newsMiniSize];
        }
        let zise = Math.floor(Math.random() * sizeCopy.length);

        let tmp = sizeCopy[zise];
        sizeCopy.splice(zise, 1);
        
        return <ContentItem key={uuidv4()} el={el} type="news" themeMap={themeMap} i={i} size={tmp}/>
    })

    
    let similarContent = theme === "news" ? <div className={`content__wrapper news__wrapper`}>{similar}</div> : null;
    let similarTitle = theme === "news" ? <h3 className="similar__title">Читайте еще</h3> : null;
    let similarBlock = (<div className="similar">
    {similarTitle}
    {similarContent}
</div>)
    let endContent = isLoading ? <Spinner/> : <SingleItemContent data={contentData} itemTheme={theme} similarContent={similarBlock}/>;

    return(
        <div className="main-block">
            {endContent}
        </div>
    )
}  

export default SingleContent;
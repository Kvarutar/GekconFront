import clock from "./clock_fill.svg";
import location from "./location_fill.svg"
import {Link} from "react-router-dom";

const ContentItem = ({el, type, themeMap}) => {
    let link = "";
    let rawDate = "";

    let id, dateOfCreation, duration, title, mainUrl, slug, descr, imgUrl, timeDate, address, town, metro, theme;


    if (type === "news"){
        ({id, dateOfCreation, duration, title, mainUrl, slug, theme} = el);
        link = `/news/${slug}`;
        rawDate = dateOfCreation;
        theme = themeMap[theme];
    }else if (type === "events"){
        ({id, descr, title, imgUrl, timeDate, address, town, metro, slug} = el);
        link = `/events/${slug}`;
        rawDate = timeDate
    }

    const date = new Date(Date.parse(rawDate)).toLocaleString('default', {month: 'long', day: 'numeric' }),
            timeBlock = type === "news" ? <div><h5 className="theme">{theme}</h5><img src={clock} alt="clock"/><h5>{duration}</h5></div> : <div><h5 className="town">{town}</h5><img src={location} alt="clock"/><h5>{address}</h5></div>
            
    let descrBlock = type === "news" ? null : <p className="events-item__text--descr">{descr}</p>;
    
    return(
        <Link to={link} className={`content-item ${type}-item`} key={id}>
            <div className={`content-item__img ${type}-item__img`}>
                <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="news image"/>
            </div>
            <div className={`content-item__text ${type}-item__text`}>
                <div className={`content-item__text--time ${type}-item__text--time`}>
                    <h5>{date}</h5>
                    {timeBlock}
                </div>
                <h4 className={`content-item__text--title ${type}-item__text--title`}>{title}</h4>
                {descrBlock}
            </div>
        </Link>
    )
}

export default ContentItem;
import Heart from "../heart/Heart";
import { v4 as uuidv4 } from 'uuid';
import clock from "./clock_fill.svg";
import group from "./group_fill.svg";
import location from "./location_fill.svg";
import {Link} from 'react-router-dom';

const SingleItemContent = ({data, itemTheme, similarContent}) => {

    const pageContent = () => {

        let author, dateOfCreation, theme, duration, title, mainUrl, slug, content, tags, url, descr, imgUrl, timeDate, address, peopleCount, town, metro;

        if (itemTheme === "news"){
            ({author, dateOfCreation, theme, duration, title, mainUrl, slug, content, tags} = data);
        }else if (itemTheme = "events"){
            console.log(data);
            ({url, descr, title, imgUrl, timeDate, address, peopleCount, town, metro} = data);
        }
        
        let result;

        if (itemTheme === "news"){
            if (content != undefined){
                let pageContent = content.map(el => newsContent(el));

                let dateFormatter = new Intl.DateTimeFormat("ru");
                let date = dateFormatter.format(new Date(dateOfCreation));

                let timeFormatter = new Intl.DateTimeFormat("ru", {
                    hour: "numeric",
                    minute: "numeric"
                });
                let time = timeFormatter.format(new Date(dateOfCreation));

                result = (
                    <div className="article page-item">
                        
                        <h1 className="article__title">{title}</h1>
                        <div className="article__meta">
                            <div className="article__meta--info">
                                <h5>{date}</h5>
                                <h5>{time} |</h5>
                                <h5>{author}</h5>
                            </div>
                        </div>
                        <div className="article__content">
                            <div className="article__content--wrapper">
                                <div className="article--btns">
                                    <div className="article--btns__heart">
                                        <Heart/>
                                    </div>
                                </div>
                                {pageContent}
                            </div>
                            <div className="article__similar">
                                {similarContent}
                            </div>
                        </div>
                        
                        
                    </div>
                )
            }
        } else if (itemTheme === "events"){
            if (timeDate != undefined){
                let timeFormatter = new Intl.DateTimeFormat("ru", {
                    day: "numeric",
                    month: "numeric"
                });
                let date = timeFormatter.format(new Date(timeDate));

                let timeFormatter1 = new Intl.DateTimeFormat("ru", {
                    hour: "numeric",
                    minute: "numeric"
                });
                let time = timeFormatter1.format(new Date(timeDate));

                result = (
                    <div className="event page-item">
                        <h1 className="event__title">{title}</h1>
                        <div className="event__content">
                                <div className="event__wrapper">
                                    <div className="event__promo">
                                        <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="promo image"/>
                                        <div className="event__promo--btns__heart">
                                            <Heart/>
                                        </div>
                                        <div className="event__promo--btns">
                                            <Link className="btn_yellow">Купить билеты</Link>
                                        </div>
                                    </div>
                                    <div className="event__main">
                                        <h4>Описание:</h4>
                                        
                                        <div>
                                            <p>{descr}</p>
                                            <div className="event__info">
                                                <div className="event__info-item">
                                                    <img src={clock} alt="clock"/>
                                                    <div>
                                                        <h4>{date}</h4>
                                                        <p>{time}</p>
                                                    </div>
                                                </div>
                                                <div className="event__info-item">
                                                    <img src={group} alt="group"/>
                                                    <h4>{peopleCount}</h4>
                                                </div>
                                                <div className="event__info-item">
                                                    <img src={location} alt="location"/>
                                                    <h4>{address}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {}
                        </div>
                    </div>
        )
            }
        }

        return result;
    }

    const newsContent = (element) => {
        let {type, text, url} = element;

        if (type === "text"){
            return(
                <p className="article__content-text article__content-item" key={uuidv4()} dangerouslySetInnerHTML={{__html:text}}></p>
            )
        }else if (type === "image"){
            return(
                <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" className="article__content-img article__content-item" key={uuidv4()}></img>
            )
        }
    }

    return(
        pageContent()
    )
}

export default SingleItemContent;
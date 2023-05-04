import {useState, useEffect} from 'react';
import {Link} from "react-router-dom";
import hot from './hot.svg';
import comments from "./comments_fill.svg";
import Spinner from "../spinner/Spinner";
import Tags from "../tags/Tags";
import "./discussionList.sass";
import { v4 as uuidv4 } from 'uuid';

const DiscussionList = () => {
    const [discussionData, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://localhost:8080/api/v1/discussions/?type=hot&page=0&discussion_per_page=9", requestOptions)
        .then(response => response.json())
        .then(result => setData(result))
        .then(setLoading(false))
        .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [])

    let cleanUpData = () => {
        setData([]);
        setLoading(true);
    }

    const content = discussionData.map(el => {
        let {id, name, slug, descr, tagsList, messagesCount} = el;
        let link = `/discussion/${slug}`; 
        let tags = tagsList.map(tg => {
            return <Tags tagContent={tg}/>
        })

        return(
            <div className="discussion-item" >
                <Link to={link} className="discussion-item__top" key={uuidv4()}>
                    <div className="discussion-item__title">
                        <p>{name}</p>
                        <img src={hot} alt="hot"/>
                    </div>
                    <div className="discussion-item__descr">
                        <h6>{descr}</h6>
                    </div>
                </Link>
                <div className="discussion-item__bottom">
                    <div className="discussion-item__tags">
                        {tags}
                    </div>
                    <div className="discussion-item__msg">
                        <p>{messagesCount}</p>
                        <img src={comments} alt="comments"/>
                    </div>
                </div>
            </div>
            
        )
    })

    let endContent = isLoading ? <Spinner/> : content;

    return(
        <div className="discussion__wrapper">
            {endContent}
        </div>
    )
}

export default DiscussionList;
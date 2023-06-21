import {useState, useEffect} from 'react';
import Spinner from "../spinner/Spinner";
import "./discussionForFeed.sass";
import DiscussionItem from "../discussionItem/DiscussionItem";
import { v4 as uuidv4 } from 'uuid';


const DiscussionForFeed = () => {
    const [discussionData, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("https://geckon-api.fly.dev/api/v1/discussions/?type=hot&page=0&discussion_per_page=9", requestOptions)
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

    const content = discussionData.map(el => <DiscussionItem discussionList={el} key={uuidv4()} mode="feed"/>)

    let endContent = isLoading ? <Spinner/> : content;

    return(
        <div className="discussion__wrapper">
            {endContent}
        </div>
    )
}

export default DiscussionForFeed;
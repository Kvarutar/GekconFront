import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../spinner/Spinner";
import Tags from "../tags/Tags";
import DiscussionItem from "../discussionItem/DiscussionItem";
import TextField from '@mui/material/TextField';
import "./discussions.sass";
import SearchPanel from "../searchPanel/SearchPanel";


const Discussions = ({discussionCategory}) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch("http://localhost:8080/api/v1/theme/?page=0&theme_per_page=5", requestOptions)
            .then(response => response.json())
            .then(result => setData(result))
            .catch(error => console.log('error', error));
    }, [])

    const content = data.map(el => {
        //вставлять skeleton сюда?
        const {name, slug, discussions} = el;
        let url = `/theme/${slug}`;

        const innerContent = discussions.map(inner => <DiscussionItem discussionList={inner} key={uuidv4()} mode="single"/>)

        return(
            <div className="themes-item" key={uuidv4()}>
                <h2 className="themes-item__title"><Link to={url}>{name}</Link></h2>
                {innerContent}
            </div>
        )
    })

    //const tagsContent = 
    const themeMap = {
        "all": "Все",
        "hot": "Обсуждаемое",
        "new": "Новое", 
    }


    return(
        <div className="themes main-block">
            <h1 className="themes__title">Обсуждения</h1>
            <div className="themes__wrapper">
                <div className="themes__content">
                    <div className="themes__controlls">
                        <SearchPanel themeMap={themeMap} type="discussions"/>
                    </div>
                    {content}
                </div>
                <div className="themes__extra">
                    <button className="btn">Создать обсуждение</button>
                    <h4>Популярные тэги</h4>
                </div>
            </div>
        </div>
    )
}

export default Discussions;
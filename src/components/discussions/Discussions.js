import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../spinner/Spinner";
import Tags from "../tags/Tags";
import DiscussionItem from "../discussionItem/DiscussionItem";
import TextField from '@mui/material/TextField';
import "./discussions.sass";


const Discussions = () => {
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

    return(
        <div className="themes">
            <h1 className="themes__title">Обсуждения</h1>
            <div className="themes__wrapper">
                <div className="themes__content">
                    {/* <TextField fullWidth id="outlined-basic" label="Поиск" variant="outlined"/> */}
                    <div className="themes__controlls">
                        <input type="text" className="themes__input inpt"/>
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
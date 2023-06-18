import {useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Spinner from "../spinner/Spinner";
import DiscussionItem from "../discussionItem/DiscussionItem";
import Tags from "../tags/Tags";
import {useParams} from 'react-router-dom';
import "./discussions.sass";
import SearchPanel from "../searchPanel/SearchPanel";


const Discussions = ({discussionCategory, type, roomsCategory}) => {
    const [data, setData] = useState([]),
          [isLoading, setLoading] = useState(true),
          { slug } = useParams(),
          [prompt, setPrompt] = useState(""),
          [themeName, setTheme] = useState(""),
          [tags, setTags] = useState([]);

    let page = 0;

    useEffect(() => {
        setLoading(true);

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
          
        fetch(getPath(), requestOptions)
            .then(response => response.json())
            .then(result => {
                const tmp = result;
                setData(tmp);
            })
            .then(() => loadTags())
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));

        return () => {
            cleanUpData();
        }
    }, [discussionCategory, type]);

    function cleanUpData(){
        setData([]);
        setLoading(true);
        //setPrompt("");
    }

    function loadTags(){
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        let url = "http://localhost:8080/api/v1/discussions/tags";

        if (type === "theme"){
            url += `?theme=${slug}`;
        }
    
        fetch(url, requestOptions)
                .then(response => response.json())
                .then(result => setTags(result))
                .catch(error => console.log('error', error));
    }

    const themeMap = type !== "theme" ? {
        "themes": "По темам",
        "discussions": "По обсуждениям", 
    } : {
        "all": "Все",
        "hot": "Обсуждаемые",
        "new": "Новые"
    }

    function getPath(name = prompt){
        let url;

        if (type === "theme"){
            url = `http://localhost:8080/api/v1/discussions/?page=${page}&discussion_per_page=10&theme=${slug}`;
            if(roomsCategory !== "all"){
                url += `&type=${roomsCategory}`
            }
        }else{
            if (discussionCategory == "themes"){
                url = `http://localhost:8080/api/v1/theme/?page=${page}&theme_per_page=5`;
            }else if (discussionCategory == "discussions") {
                url = `http://localhost:8080/api/v1/discussions/?page=${page}&discussion_per_page=10`;
            }
        }
        
        if (name != ""){
            url += `&name=${name}`;
        }

        return url;
    }

    function loadByTitle(prompt){
        setPrompt(prompt);
        console.log(getPath(prompt))

        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch(getPath(prompt), requestOptions)
            .then(response => response.json())
            .then(result => setData([...result]))
            .then(console.log(data))
            .then(() => setLoading(false))
            .catch(error => console.log('error', error));
    }

    function clickHandler(name){
        setTheme(name);
    }

    const content = () => {
        if (discussionCategory === "themes" && type !== "theme" && Array.isArray(data)){
            return data.map(el => {
                const {name, slug, discussions} = el;
                let url = `/theme/${slug}`;

                if (discussions != undefined){
                    const innerContent = discussions.map(inner => <DiscussionItem discussionList={inner} key={uuidv4()} mode="single"/>)

                    return (
                        <div className="themes-item" key={uuidv4()}>
                            <h2 className="themes-item__title"><Link to={url}>{name}</Link></h2>
                            <div className="themes-item__wrapper">
                                {innerContent}
                            </div>
                            <div className="themes-item__btn">
                                <Link to={url} className="btn" onClick={() => clickHandler(name)}>К теме "{name}"</Link>
                            </div>
                        </div>
                    )
                }
            })
        }else{
            let tmp

            if (Array.isArray(data)){
                tmp = data.map(el => {
                    if(el.discussions === undefined){
                        return <DiscussionItem discussionList={el} key={uuidv4()} mode="single"/> 
                    }
                })
            }
            return(
                <div className="themes-item__wrapper">
                    {tmp}
                </div>
            ) 
        }
    }

    let tagsContent = tags.map(el => {
        return(
            <div className="themes__tags-item">
                <Tags tagContent={el} key={uuidv4()}/>
                <h5>x {el.count}</h5>
            </div>
        )
    })

    return(
        isLoading ? <Spinner/> : 
        <div className="themes main-block">
            <h1 className="themes__title">{type === "theme" ? themeName : "Обсуждения"}</h1>
            <div className="themes__wrapper">
                <div className="themes__content">
                    <div className="themes__controlls">
                        <SearchPanel themeMap={themeMap} type={type === "theme" ? "theme" : "discussions"} onSearch={loadByTitle}/>
                    </div>
                    {content()}
                </div>
                <div className="themes__extra">
                    <button className="btn">Создать обсуждение</button>
                    <h4>Популярные тэги</h4>
                    <div className="themes__tags">
                        {tagsContent}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Discussions;
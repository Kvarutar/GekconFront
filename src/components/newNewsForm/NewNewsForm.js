import {useState, useEffect} from 'react';
import slugify from 'react-slugify';
import { v4 as uuidv4 } from 'uuid';

const NewNewsForm = () => {
    const [title, setTitle] = useState(""),
          [duration, setDuration] = useState(""),
          [theme, setTheme] = useState(""),
          [imgUrl, setImgUrl] = useState(""),
          [wallpaper, setWallpaper] = useState(null),
          [content, setContent] = useState([]),
          [tags, setTags] = useState([]),
          [contentText, setText] = useState(""),
          [txt, setTxt] = useState("");

    let [inputId, setInputId] = useState(0);
    let [imageId, setImageId] = useState(1);
          
    useEffect(() => {

    }, [])

    const onInputHandler = (e, el, type) => {
        let newContent;
        if(type === "text"){
            newContent = {
                ...el,
                text: e.target.value,
            }
        }else if(e.target.files && e.target.files[0]){
            newContent = {
                ...el,
                url: URL.createObjectURL(e.target.files[0]),
                image: e.target.files[0]
            }
        }

        let newContentArr = [...content.slice(0, el.id), newContent, ...content.slice(el.id+1)]

        setContent(newContentArr);
    }

    const onAddContent = (type) => {
        let tmp = [...content];
        let newId = inputId;
        tmp.push({
            id: newId,
            type: type,
            text: "",
            url: "",
            imgId: imageId,
        })

        setContent(tmp);
        setInputId(inputId + 1);
        setImageId(imageId + 1);
    }

    const onWallpaperHandler = (e) => {
        if(e.target.files && e.target.files[0]){
            setWallpaper(e.target.files[0])
        }
        
    } 

    const onSendHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formData = new FormData();

        formData.append('files', wallpaper);

        for (let i = 0; i < content.length; i++){
            formData.append('files', content[i].image);
        }
        
        var raw = JSON.stringify({
            "author": "Alexandr Voronchikhin",
            "dateOfCreation": "2000-25-03",
            "theme": "games",
            "duration": "9 min",
            "title": title,
            "mainUrl": "asdasdasd",
            "slug": slugify(translit(title)),
            "content": content,
            "tags": [
                {
                "name": "Комиксы",
                "slug": "comics"
                },
                {
                "name": "Джеймс Ванн",
                "slug": "james-vann"
                }
            ],
        });

        formData.append('model', raw);
        console.log(formData);

        var requestOptions = {
                method: 'POST',
                //headers: myHeaders,
                body: formData,
                // redirect: 'follow'
        };

        fetch("http://localhost:8080/api/v1/news/new", requestOptions)
                .then(response => response.text())
                .then(result => console.log(result))
                .catch(error => console.log('error', error));
    }

    function translit(str){
        let ru=("А-а-Б-б-В-в-Ґ-ґ-Г-г-Д-д-Е-е-Ё-ё-Є-є-Ж-ж-З-з-И-и-І-і-Ї-ї-Й-й-К-к-Л-л-М-м-Н-н-О-о-П-п-Р-р-С-с-Т-т-У-у-Ф-ф-Х-х-Ц-ц-Ч-ч-Ш-ш-Щ-щ-Ъ-ъ-Ы-ы-Ь-ь-Э-э-Ю-ю-Я-я").split("-")   
        let en=("A-a-B-b-V-v-G-g-G-g-D-d-E-e-E-e-E-e-ZH-zh-Z-z-I-i-I-i-I-i-J-j-K-k-L-l-M-m-N-n-O-o-P-p-R-r-S-s-T-t-U-u-F-f-H-h-TS-ts-CH-ch-SH-sh-SCH-sch-'-'-Y-y-'-'-E-e-YU-yu-YA-ya").split("-")   
        let res = '';
        for(let i=0, l=str.length; i<l; i++) { 

            let s = str.charAt(i), n = ru.indexOf(s); 

            if(n >= 0) { 
                res += en[n]; 
            } else { 
                res += s; 
            } 
        } 
        return res;  
    }

    let mainContent = () => {
        if(content.length != 0){
            return content.map(el => {
                if (el.type === "text"){
                    return <input key={el.id} className="inpt newnews__form--input" type="text" value={el.text} onInput={(e) => onInputHandler(e, el, "text")}/>
                }else{
                    if (el.url === ""){
                        return <input key={el.id} className="inpt newnews__form--image" type="file" onInput={(e) => onInputHandler(e, el, "image")}/>
                    }else{
                        return <img src={el.url}/>
                    }
                    
                }
                
            })
        }
    }

    return (
        <div className="newnews main-block">
            <h1 className="newnews__title">Создать новость</h1>
            <div className="newnews__wrapper">
                {/* <form action="" className="newnews__form"> */}
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Название новости</h3>
                        <input type="text" 
                                className="inpt" 
                                value={title} 
                                onInput={(e) => setTitle(e.target.value)}
                                />
                    </div>
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Обложка</h3>
                        <input type="file" className="inpt" onChange={(e) => onWallpaperHandler(e)}/>
                    </div>
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Основной контент</h3>
                        {mainContent()}
                        <div className="btns">
                            <button className="btn" onClick={() => onAddContent("text")}>Добавить текст</button>
                            <button className="btn" onClick={() => onAddContent("image")}>Добавить изображение</button>
                        </div>
                    </div>
                    <div className="newnews__form-item">
                        
                    </div>
                    <button className="btn" onClick={onSendHandler}>Отправить</button>
                {/* </form> */}
            </div>
        </div>
    )
}

export default NewNewsForm;
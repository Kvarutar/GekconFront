import {useState, useEffect} from 'react';
import slugify from 'react-slugify';
import {Link} from 'react-router-dom';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import imageCompression from 'browser-image-compression';
import Add from '@mui/icons-material/Add';
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
//import "./newNewsForm.sass";


const filter = createFilterOptions();

const NewDiscussionsForm = () => {
    const [title, setTitle] = useState(""),
          [duration, setDuration] = useState(""),
          [theme, setTheme] = useState(""),
          [wallpaper, setWallpaper] = useState(null),
          [content, setContent] = useState([]),
          [tags, setTags] = useState([]),
          [loadTags, setLoadTags] = useState([]);

    let [inputId, setInputId] = useState(0);
    let [imageId, setImageId] = useState(1);
          
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("https://geckon-api.fly.dev/api/v1/news/tags", requestOptions)
                .then(response => response.json())
                .then(result => setLoadTags(result))
                .catch(error => console.log('error', error));
    }, [])

    const uploader = Uploader({ apiKey: "public_W142hzu2oynhkDeaL71SnMprkBx6" });
    const uploaderOptions = {
        multi: false,

        // Comment out this line & use 'onUpdate' instead of 
        // 'onComplete' to have the dropzone close after upload.
        //showFinishButton: false,
        
        styles: {
            colors: {
            primary: "#377dff"
            }
        }
    }

    const MyDropzone = ({el, isWallpaper = false}) => 
        <UploadDropzone uploader={uploader}
                        options={uploaderOptions}
                        onUpdate={(files) => onInputHandler("", el, "image", files, isWallpaper)}
                        width="100%"
                        height="375px" />

    async function onInputHandler (e, el, type, files, isWallpaper){
        if (!isWallpaper){
            let newContent;
            if(type === "text"){
                newContent = {
                    ...el,
                    text: e.target.value,
                }
            }else{
                    
                // Tip: save 'filePath' to your DB (not 'fileUrl').
                console.log(files);
                const filePath = files[0].filePath 
                // "raw" for un-transformed file.
                const fileUrl  = uploader.url(filePath, "raw")
                newContent = {
                    ...el,
                    url: filePath,
                    //image: img
                }
            }

            let newContentArr = [...content.slice(0, el.id), newContent, ...content.slice(el.id+1)]

            setContent(newContentArr);
        }else{
            console.log(files);
            const filePath = files[0].filePath 
            // "raw" for un-transformed file.
            const fileUrl  = uploader.url(filePath, "raw")
            setWallpaper(filePath);
        }
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
        if (type === "image"){
            setImageId(imageId + 1);
        }
        
    }

    async function onWallpaperHandler(e){
        const options = {
            maxSizeMB: 1,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
        }
        if(e.target.files && e.target.files[0]){
            let img;
            try {
                const compressedFile = await imageCompression(e.target.files[0], options);
                console.log('compressedFile instanceof Blob', compressedFile instanceof Blob); // true
                console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`); // smaller than maxSizeMB
            
                img = await new File([compressedFile], `${slugify(translit(title))}_0.jpg`);
                setWallpaper(img) // write your own logic
            } catch (error) {
                console.log(error);
            }
        }
        
    } 

    function formatDate(date) {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-');
    }

    const onSendHandler = () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const formData = new FormData();

        let time = formatDate(new Date());
        
        var raw = JSON.stringify({
            "author": "Alexandr Voronchikhin",
            "dateOfCreation": time.replaceAll(".", "-"),
            "theme": theme,
            "duration": `${duration} мин`,
            "title": title,
            "mainUrl": wallpaper,
            "slug": slugify(translit(title)),
            "content": content,
            "tags": tags,
        });

        formData.append('model', raw);

        var requestOptions = {
                method: 'POST',
                //headers: myHeaders,
                body: formData,
                // redirect: 'follow'
        };

        fetch("https://geckon-api.fly.dev/api/v1/news/new", requestOptions)
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
                    return <textarea 
                                        key={el.id} 
                                        className="inpt newnews__form--input" 
                                        type="text" value={el.text} 
                                        onInput={(e) => onInputHandler(e, el, "text")}
                                        />
                }else{
                    if (el.url === ""){
                        return <MyDropzone key={el.id} el={el}/>
                    }else{
                        return <img src={`https://upcdn.io/W142hzu/raw${el.url}`} className="newnews__form--image_selected"/>
                    }
                    
                }
                
            })
        }
    }

    return (
        <div className="newnews main-block">
            <h1 className="newnews__title">Создать новость</h1>
            <div className="newnews__wrapper">
                    <div className="newnews__form-item newnews__form-item_meta">
                        <div className="title">
                            <h3 className="newnews__form-label">Название новости</h3>
                            <input type="text" 
                                    className="inpt" 
                                    value={title} 
                                    onInput={(e) => setTitle(e.target.value)}
                                    />
                            
                        </div>
                        <div className="duration">
                            <h3 className="newnews__form-label">Длительность</h3>
                            <div>
                                <input type="number" 
                                            className="inpt" 
                                            value={duration} 
                                            onInput={(e) => setDuration(e.target.value)}
                                            />
                                <p>минут</p>
                            </div>
                        </div>
                    </div>
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Обложка</h3>
                        {wallpaper === null ? 
                        <MyDropzone isWallpaper={true}/> : 
                        <img src={`https://upcdn.io/W142hzu/raw${wallpaper}`} className="newnews__form--image_selected"/>}
                            
                        
                            
                        
                    </div>
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Основной контент</h3>
                        {mainContent()}
                        <div className="btns">
                            <button className="btn" onClick={() => onAddContent("text")}>Добавить текст</button>
                            <button className="btn" onClick={() => onAddContent("image")}>Добавить изображение</button>
                        </div>
                    </div>
                    <div className="newnews__form-item newnews__form-item_bottom">
                        <div className="theme">
                            <h3 className="newnews__form-label">Тема</h3>
                            <Select 
                                size="lg"
                                onChange={(event, newValue) => {
                                    setTheme(newValue);
                                }}
                                >
                                <Option value="games">Игры</Option>
                                <Option value="comics">Комиксы</Option>
                                <Option value="films">Фильмы</Option>
                                <Option value="cosplay">Косплей</Option>
                            </Select>
                        </div>
                        <div className="tags">
                            <h3 className="newnews__form-label">Теги</h3>
                                <Autocomplete
                                    id="tags-default"
                                    size="lg"
                                    multiple
                                    limitTags={2}
                                    options={allTowns}
                                    onChange={(event, newValue) => {
                                        let tmp = [...newValue];
                                        tmp.map(el => {
                                            return {
                                                name: el.name,
                                                slug: el.slug
                                            }
                                        });
                                        setTown(newValue);
                                     }}
                                    getOptionLabel={(option) => {
                                        // Value selected with enter, right from the input
                                        if (typeof option === 'string') {
                                        return option;
                                        }
                                        // Add "xxx" option created dynamically
                                        if (option.inputValue) {
                                        return option.inputValue;
                                        }
                                        // Regular option
                                        return option.name;
                                    }}
                                    filterOptions={(options, params) => {
                                        const filtered = filter(options, params);
                                
                                        const { inputValue } = params;
                                        // Suggest the creation of a new value
                                        const isExisting = options.some((option) => inputValue === option.name);
                                        if (inputValue !== '' && !isExisting) {
                                            filtered.push({
                                                inputValue,
                                                name: `Добавить "${inputValue}"`,
                                                slug: slugify(translit(inputValue))
                                            });
                                        }
                                
                                        return filtered;
                                    }}
                                    freeSolo
                                    handleHomeEndKeys
                                    renderOption={(props, option) => (
                                        <AutocompleteOption {...props}>
                                        {option.name?.startsWith('Add "') && (
                                            <ListItemDecorator>
                                            <Add />
                                            </ListItemDecorator>
                                        )}
                            
                                        {option.name}
                                        </AutocompleteOption>
                                    )}
                                    />
                        </div>
                    </div>
                    <div className="newnews__form--submit">
                        <Link to="/news/" className="btn btn_disabled">Отменить</Link>
                        <button className="btn" onClick={onSendHandler}>Отправить</button>
                    </div>
            </div>
        </div>
    )
}

export default NewDiscussionsForm;
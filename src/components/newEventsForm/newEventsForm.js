import {useState, useEffect} from 'react';
import slugify from 'react-slugify';
import {Link} from 'react-router-dom';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { Uploader } from "uploader";
import { UploadDropzone } from "react-uploader";
import Autocomplete, { createFilterOptions } from '@mui/joy/Autocomplete';
import AutocompleteOption from '@mui/joy/AutocompleteOption';
import Add from '@mui/icons-material/Add';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

const filter = createFilterOptions();

const NewEventsForm = () => {
    const [title, setTitle] = useState(""),
          [link, setLink] = useState(""),
          [town, setTown] = useState(""),
          [descr, setDescr] = useState(""),
          [timeDate, setTimeDate] = useState(""),
		  [address, setAddress] = useState(""),
		  [peopleCount, setPeople] = useState(""),
		  [allTowns, setAllTowns] = useState([]),
		  [wallpaper, setWallpaper] = useState(null);
          
    useEffect(() => {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };
        
        fetch("https://geckon-api.fly.dev/api/v1/events/towns", requestOptions)
                .then(response => response.json())
                .then(result => setAllTowns(result))
                .catch(error => console.log('error', error));
    }, [])

    const uploader = Uploader({ apiKey: "public_W142hzu2oynhkDeaL71SnMprkBx6" });
    const uploaderOptions = {
        multi: false,
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
		const filePath = files[0].filePath 
		// "raw" for un-transformed file.
		const fileUrl  = uploader.url(filePath, "raw")
		setWallpaper(filePath);
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

        let time = formatDate(timeDate);
        
        var raw = JSON.stringify({
            "url": link,
			"descr": descr,
			"title": title,
			"imgUrl": wallpaper,
			"timeDate": time,
			"address": address,
			"peopleCount": peopleCount,
			"town": town,
			"slug": slugify(translit(title))
        });

        var requestOptions = {
				method: 'POST',
				headers: myHeaders,
				body: raw,
				redirect: 'follow'
        };

        fetch("https://geckon-api.fly.dev/api/v1/events/new", requestOptions)
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

    return (
        <div className="newnews main-block">
            <h1 className="newnews__title">Создать мероприятие</h1>
            <div className="newnews__wrapper">
                    <div className="newnews__form-item newnews__form-item_meta">
                        <div className="title">
                            <h3 className="newnews__form-label">Название мероприятия</h3>
                            <input type="text" 
                                    className="inpt" 
                                    value={title} 
                                    onInput={(e) => setTitle(e.target.value)}
                                    />
                        </div>
                    </div>
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Обложка</h3>
                        {wallpaper === null ? 
                        <MyDropzone isWallpaper={true}/> : 
                        <img src={`https://upcdn.io/W142hzu/raw${wallpaper}`} className="newnews__form--image_selected"/>}
                    </div>
                    <div className="newnews__form-item newnews__form-item_bottom">
                        <div>
							<h3 className="newnews__form-label">Ссылка на покупку билетов</h3>
							<input className="inpt" type="text" value={link} onInput={(e) => setLink(e.target.value)}/>
						</div>
                        <div className="theme">
                            <h3 className="newnews__form-label">Город</h3>
                            <Autocomplete
								id="tags-default"
								size="lg"
								options={allTowns}
								onChange={(event, newValue) => {
										setTown(newValue.inputValue);
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
                    <div className="newnews__form-item">
                        <h3 className="newnews__form-label">Основной контент</h3>
                        <textarea  
                            className="inpt newnews__form--input" 
                            type="text" value={descr} 
                            onInput={(e) => setDescr(e.target.value)}
                            />
                        <div>
							<div>
								<input className="inpt" type="date" placeholder="12.01" value={timeDate} onChange={(e) => setTimeDate(e.target.value)} />
								<input className="inpt" type="text" placeholder="12:00"/>
							</div>
							<input className="inpt" type="number" value={peopleCount} onChange={(e) => setPeople(e.target.value)} placeholder="Количество человек"/>
							<input className="inpt" type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Адрес"/>
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

export default NewEventsForm;
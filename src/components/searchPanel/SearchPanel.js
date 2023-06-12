import { useState, useCallback, useEffect } from 'react';
import SortPanel from "../../containers/SortPanel";
import slugify from 'react-slugify';
import { v4 as uuidv4 } from 'uuid';
import "./searchPanel.sass";
import calendarIcon from './calendar_fill.svg';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Calendar from 'react-calendar';
import close from "./close.svg";
import Input from '@mui/joy/Input';


const SearchPanel = ({themeMap, type, onSearch, isCalendar, switchCalendar, date, setNewDate}) => {
    const [isSearch, setSearch] = useState(false),
          [title, setTitle] = useState(''),
          [towns, setTowns] = useState([]);

    useEffect(() => {
        if (type == "events"){
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
            };
            
            fetch("http://localhost:8080/api/v1/events/towns", requestOptions)
                .then(response => response.json())
                .then(result => setTowns(result.map(el => <Option key={uuidv4()} value={slugify(translit(el))}>{el}</Option>)))
                .catch(error => console.log('error', error));
            }
    }, [])

    const onBlurHandler = useCallback(() => {
        setSearch(true);
    }, [isSearch])

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

    function onSearchBtn(isClean = false) {
        if(isClean){
            setSearch(false);
            setTitle("")
            onSearch(slugify(translit("")));
        }else{
            setSearch(false);
            onSearch(slugify(translit(title)));
        }
        
    }

    let searchBtn = isSearch ? <button className="btn btn_find" onClick={() => onSearchBtn()}>Искать</button> : null;

    return (
        <div className="content__panel search">
            <div className="content__panel--search"
            onFocus={onBlurHandler}
                >
                <div className="content__panel--inpt">
                    <input type="text" 
                            className="inpt" 
                            value={title} 
                            onInput={(e) => setTitle(e.target.value)}
                            />
                    {isSearch ? <img src={close} className="content__panel--close" onClick={() => onSearchBtn(true)}/> : null}
                </div>
                {searchBtn}
            </div>

            {isSearch ? 
                null : 
                type === "events" ? 
                <div className="date sort">
                    <Select 
                        defaultValue="all"
                        className="sort-item"
                        size="lg"
                        variant="solid"
                        // onChange={(event, newValue) => {
                        //     setTheme(newValue);
                        // }}
                        >
                        <Option value="all" key={uuidv4()}>Все города</Option>
                        {towns}
                    </Select>
                    <div className={`sort-item`} key={uuidv4()} onClick={() => switchCalendar()}>
                        <h5 className="sort-item--date">{date.toLocaleString('default', {month: 'long', year: 'numeric' })}</h5>
                        <Calendar 
                                view="year" 
                                className={`date__calendar ${isCalendar ? "date__calendar_active" : "" }`}
                                onClickMonth={(value) => setNewDate(value)}
                            ></Calendar>
                    </div>
                </div> :
                <SortPanel sortList={themeMap} theme={type} isCalendar={isCalendar} switchCalendar={switchCalendar} date={date} setNewDate={setNewDate}/>}
        </div>
    )
}

export default SearchPanel;

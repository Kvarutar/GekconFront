import { useState, useCallback } from 'react';
import SortPanel from "../../containers/SortPanel";

const SearchPanel = ({themeMap, type}) => {
    const [isSearch, setSearch] = useState(false);

    const onBlurHandler = useCallback(() => {
        if(isSearch){
            setSearch(false);
        }else{
            setSearch(true);
        }
    }, [isSearch])

    let searchBtn = isSearch ? <button className="btn">Искать</button> : null;

    let newsPanel = (
        <div className="content__panel">
            <div className="content__panel--search">
                <input 
                    onFocus={onBlurHandler} 
                    onBlur={onBlurHandler}
                    type="text" 
                    className="inpt"
                    placeholder="Введите название новости..."
                    /> 
                {searchBtn}
            </div>
            {isSearch ? null : <SortPanel sortList={themeMap} theme={type}/>}
        </div>
    )

    return newsPanel;
}

export default SearchPanel;
import { v4 as uuidv4 } from 'uuid';
import "./sortPanel.sass"

const SortPanel = ({sortList, newsCategory, setNewsFilter, discussionCategory, 
    setDiscussionFilter, profileCategory, setProfileFilter, theme, roomsCategory, setRoomsFilter}) => {

    const renderContent = (mapKey, value, setFilter, category) => {
        let classList = category === mapKey ? "sort-item_active" : "";

        return(
            <div className={`sort-item ${classList}`} key={uuidv4()} onClick={() => setFilter(mapKey)}>
                <h5>{value}</h5>
            </div>
        )
    }

    const setContent = () => {
        const content = [];
        let setFilter;
        let category;

        switch(theme){
            case "news":
                setFilter = setNewsFilter;
                category = newsCategory;
                break;
            case "discussions":
                setFilter = setDiscussionFilter;
                category = discussionCategory;
                break;
            case "profile":
                setFilter = setProfileFilter;
                category = profileCategory;
                break;
            case "theme":
                setFilter = setRoomsFilter;
                category = roomsCategory;
                break;
        }

        for (let [key, value] of Object.entries(sortList)) {
            content.push(renderContent(key, value, setFilter, category));
        }

        return content;
    }

    return(
        <div className="sort">{setContent()}</div>
    )
}

export default SortPanel;
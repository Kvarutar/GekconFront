import { v4 as uuidv4 } from 'uuid';
import "./sortPanel.sass"

const SortPanel = ({sortList, newsCategory, setNewsFilter, discussionCategory, 
    setDiscussionFilter, eventsCategory, setEventsFilter, theme}) => {

    const renderContent = (mapKey, value, setFilter, category) => {
        let classList = category === mapKey ? "sort-item_active" : "";

        return(
            <div className={`sort-item ${classList}`} key={uuidv4()} onClick={() => setFilter(mapKey)}>
                <h5>{value}</h5>
            </div>
        )
    }

    // <div className = "date">
    //     <div className="date__left date-item">
    //         <h5>{date.toLocaleString('default', {month: 'long', year: 'numeric' })}</h5>
    //     </div>
    //     <div className="date__right date-item">
    //         <img src={calendarIcon} alt="calendar" onClick={() => switchCalendar()}/>
    //         <Calendar 
    //             view="year" 
    //             className={`date__calendar ${isCalendar ? "date__calendar_active" : "" }`}
    //             onClickMonth={(value) => setNewDate(value)}
    //         ></Calendar>
    //     </div>
    // </div>

    const setContent = () => {
        const content = [];
        let setFilter;
        let category;

        if (theme === "news"){
            setFilter = setNewsFilter;
            category = newsCategory;
        } else if (theme === "events"){
            setFilter = setEventsFilter;
            category = eventsCategory;
        } else if (theme === "discussions"){
            setFilter = setDiscussionFilter;
            category = discussionCategory;
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
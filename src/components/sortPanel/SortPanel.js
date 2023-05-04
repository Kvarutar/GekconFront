import { v4 as uuidv4 } from 'uuid';
import "./sortPanel.sass"

const SortPanel = ({sortList, category, setFilter}) => {

    const renderContent = (mapKey, value) => {
        let classList = category === mapKey ? "sort-item_active" : "";

        return(
            <div className={`sort-item ${classList}`} key={uuidv4()} onClick={() => setFilter(mapKey)}>
                <h5>{value}</h5>
            </div>
        )
    }

    const content = [];

    for (let [key, value] of Object.entries(sortList)) {
        content.push(renderContent(key, value));
    }

    return(
        <div className="sort">{content}</div>
    )
}

export default SortPanel;
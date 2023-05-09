import {Link} from "react-router-dom";
import hot from './hot.svg';
import comments from "./comments_fill.svg";
import Tags from "../tags/Tags";
import { v4 as uuidv4 } from 'uuid';
import "./discussionItem.sass";


const DiscussionItem = ({discussionList, mode}) => {
    let {id, name, slug, descr, tagsList, messagesCount} = discussionList;
    let link = `/discussion/${slug}`; 
    let tags = tagsList.map(tg => {
        return <Tags tagContent={tg} key={uuidv4()}/>
    })

    let classList = mode === "feed" ? "discussion-item_feed" : "discussion-item_single";
    let left = mode === "single" ? (<div className="discussion-item_single__left">
                                        <img src="" alt=""/>
                                        <div className={`${classList}__msg`}>
                                            <p>{messagesCount}</p>
                                            <img src={comments} alt="comments"/>
                                        </div>
                                    </div>) : null;

    let bottomMsg = mode === "feed" ? (<div className={`${classList}__msg`}>
                                            <p>{messagesCount}</p>
                                            <img src={comments} alt="comments"/>
                                        </div>) : null;

    return(
        <div className={`${classList}`}>
            <Link to={link} className={`${classList}__top`}>
                {left}
                <div className={`${classList}__top--wrapper`}>
                    <div className={`${classList}__title`}>
                        <p>{name}</p>
                        <img src={hot} alt="hot"/>
                    </div>
                    <div className={`${classList}__descr`}>
                        <h6>{descr}</h6>
                    </div>
                </div>
            </Link>
            <div className={`${classList}__bottom`}>
                <div className={`${classList}__tags`}>
                    {tags}
                </div>
                {bottomMsg}
            </div>
        </div>
    )
}

export default DiscussionItem;
import {Link} from "react-router-dom";
import hot from './hot.svg';
import comments from "./comments_fill.svg";
import pin from "./push_fill.svg"
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
                                        <img src="https://sun9-34.userapi.com/impg/ZGuJiFBAp-93En3yLK7LWZNPxTGmncHrrtVgbg/hd6uHaUv1zE.jpg?size=1200x752&quality=96&sign=e79799e4b75c839d0ddb1a2232fe5d60&type=album" alt="" className="discussion-item_single--image"/>
                                        <div className={`${classList}__msg`}>
                                            <div className="meta">
                                                <div className="meta-item">
                                                    <h6>{messagesCount}</h6>
                                                    <img src={comments} alt="comments"/>
                                                </div>
                                                <div className="meta-item">
                                                    <h6>0</h6>
                                                    <img src={pin} alt="pin" className="pin"/>
                                                </div>
                                            </div>
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
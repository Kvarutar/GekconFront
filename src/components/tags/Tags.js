import "./tags.sass";
import {Link} from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';

const Tags = ({tagContent}) => {
    let {id, name, slug} = tagContent;
    let tagLink = `/discussion/?tag=${slug}`

    return(
        <Link to={tagLink} className="tag">
            <p>#{name}</p>
        </Link>
    )
}

export default Tags;
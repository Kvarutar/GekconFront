import {connect} from 'react-redux';
import ContentList from "../components/contentList/ContentList";

const mapStateToProps = (state) => ({
    newsCategory: state.filter.newsCategory,
    eventsCategory: state.filter.eventsCategory
})

export default connect(mapStateToProps)(ContentList)
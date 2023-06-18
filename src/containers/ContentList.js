import {connect} from 'react-redux';
import ContentList from "../components/contentList/ContentList";

const mapStateToProps = (state) => ({
    newsCategory: state.filter.newsCategory,
    eventsCategory: state.filter.eventsCategory,
    profileNewsCategory: state.filter.profileCategory,
    likedEvents: state.user.likedEvents, 
    likedTags: state.user.likedTags,
    isLogged: state.session.isLogged,
})

export default connect(mapStateToProps)(ContentList)
import {connect} from 'react-redux';
import SortPanel from '../components/sortPanel/SortPanel';
import { bindActionCreators } from 'redux';
import {setNewsFilter, setDiscussionFilter, setEventsFilter, setProfileFilter} from "../actions";

const mapStateToProps = (state) => ({
    newsCategory: state.filter.newsCategory,
    eventsCategory: state.filter.eventsCategory,
    discussionCategory: state.filter.discussionCategory,
    profileCategory: state.filter.profileCategory
})

const mapDispatchToProps = dispatch => ({
    setNewsFilter: bindActionCreators(setNewsFilter, dispatch),
    setEventsFilter: bindActionCreators(setEventsFilter, dispatch),
    setDiscussionFilter: bindActionCreators(setDiscussionFilter, dispatch),
    setProfileFilter: bindActionCreators(setProfileFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortPanel)
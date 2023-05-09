import {connect} from 'react-redux';
import SortPanel from '../components/sortPanel/SortPanel';
import { bindActionCreators } from 'redux';
import {setNewsFilter, setDiscussionFilter, setEventsFilter} from "../actions";

const mapStateToProps = (state) => ({
    newsCategory: state.filter.newsCategory,
    eventsCategory: state.filter.eventsCategory,
    discussionCategory: state.filter.discussionCategory
})

const mapDispatchToProps = dispatch => ({
    setNewsFilter: bindActionCreators(setNewsFilter, dispatch),
    setEventsFilter: bindActionCreators(setEventsFilter, dispatch),
    setDiscussionFilter: bindActionCreators(setDiscussionFilter, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(SortPanel)
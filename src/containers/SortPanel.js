import {connect} from 'react-redux';
import SortPanel from '../components/sortPanel/SortPanel';
import { bindActionCreators } from 'redux';
import {setNewsFilter, setEventsFilter, setProfileFilter} from "../actions";

const mapStateToProps = (state) => ({
    newsCategory: state.filter.newsCategory,
    eventsCategory: state.filter.eventsCategory,
    profileCategory: state.filter.profileCategory
})

const mapDispatchToProps = dispatch => ({
    setNewsFilter: bindActionCreators(setNewsFilter, dispatch),
    setEventsFilter: bindActionCreators(setEventsFilter, dispatch),
    setProfileFilter: bindActionCreators(setProfileFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SortPanel)
import {connect} from 'react-redux';
import SearchPanel from '../components/searchPanel/SearchPanel';
import { bindActionCreators } from 'redux';
import {setEventsFilter} from "../actions";

const mapStateToProps = (state) => ({
    eventsCategory: state.filter.eventsCategory,
})

const mapDispatchToProps = dispatch => ({
    setEventsFilter: bindActionCreators(setEventsFilter, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SearchPanel)
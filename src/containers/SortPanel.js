import {connect} from 'react-redux';
import SortPanel from '../components/sortPanel/SortPanel';
import { bindActionCreators } from 'redux';
import {setFilter} from "../actions";

const mapStateToProps = (state) => ({
    category: state.filter.category
})

const mapDispatchToProps = dispatch => ({
    setFilter: bindActionCreators(setFilter, dispatch) 
})

export default connect(mapStateToProps, mapDispatchToProps)(SortPanel)
import {connect} from 'react-redux';
import ContentList from "../components/contentList/ContentList";

const mapStateToProps = (state) => ({
    category: state.filter.category
})

export default connect(mapStateToProps)(ContentList)
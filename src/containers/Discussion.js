import {connect} from 'react-redux';
import Discussions from "../components/discussions/Discussions";

const mapStateToProps = (state) => ({
    discussionCategory: state.filter.discussionCategory,
    roomsCategory: state.filter.roomsCategory
})

export default connect(mapStateToProps)(Discussions)
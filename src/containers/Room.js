import {connect} from 'react-redux';
import Room from "../components/room/Room";

const mapStateToProps = state => ({
    userData: state.user,
})

export default connect(mapStateToProps)(Room);
import {connect} from 'react-redux';
import Feed from "../components/feed/Feed"

const mapStateToProps = state => ({
    isLogged: state.session.isLogged
})

export default connect(mapStateToProps)(Feed);
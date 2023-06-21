import {connect} from 'react-redux';
import Profile from "../components/profile/Profile";
import { bindActionCreators } from 'redux';
import {setUserInfo, login, logout, setAccessToken} from "../actions";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged,
    userData: state.user,
    profileCategory: state.filter.profileCategory
})

const mapDispatchToProps = dispatch => ({
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    logout: bindActionCreators(logout, dispatch),
    setAccessToken: bindActionCreators(setAccessToken, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
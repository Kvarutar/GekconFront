import {connect} from 'react-redux';
import Header from "../components/header/Header";
import { bindActionCreators } from 'redux';
import {setUserInfo, login, setAccessToken, setRefreshToken} from "../actions";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged,
    id: state.user.id,
    accessToken: state.user.accessToken
    // personName: state.user.name,
    // photoUrl: state.user.photoUrl,
    // role: state.user.role,
    // follows: state.user.follows,
    // followers: state.user.followers,
    // likedEvents: state.user.likedEvents,
    // likedTags: state.user.likedTags,
    // refreshToken: state.user.refreshToken,
    // accessToken: state.user.accessToken
})

const mapDispatchToProps = dispatch => ({
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    login: bindActionCreators(login, dispatch),
    setAccessToken: bindActionCreators(setAccessToken, dispatch),
    setRefreshToken: bindActionCreators(setRefreshToken, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(Header);
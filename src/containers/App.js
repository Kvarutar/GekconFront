import {connect} from 'react-redux';
import App from "../components/app/App";
import { bindActionCreators } from 'redux';
import {setUserInfo, login, setAccessToken, logout} from "../actions";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged,
})

const mapDispatchToProps = dispatch => ({
    setUserInfo: bindActionCreators(setUserInfo, dispatch),
    login: bindActionCreators(login, dispatch),
    setAccessToken: bindActionCreators(setAccessToken, dispatch),
    logout: bindActionCreators(logout, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
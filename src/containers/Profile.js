import {connect} from 'react-redux';
import Profile from "../components/profile/Profile";
import { bindActionCreators } from 'redux';
// import {setUserInfo, login, setAccessToken, setRefreshToken} from "../actions";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged,
    userData: state.user,
    filter: state.filter.profileCategory
})

// const mapDispatchToProps = dispatch => ({
//     setUserInfo: bindActionCreators(setUserInfo, dispatch),
//     login: bindActionCreators(login, dispatch),
//     setAccessToken: bindActionCreators(setAccessToken, dispatch),
//     setRefreshToken: bindActionCreators(setRefreshToken, dispatch)
// })

export default connect(mapStateToProps)(Profile);
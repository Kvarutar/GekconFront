import {connect} from 'react-redux';
import Header from "../components/header/Header";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged
})

export default connect(mapStateToProps)(Header);
import {connect} from 'react-redux';
import SingleItemContent from "../components/singleItemContent/SingleItemContent";

const mapStateToProps = state => ({
    isLogged: state.session.isLogged,
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleItemContent);
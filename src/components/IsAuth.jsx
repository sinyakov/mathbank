import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const IsAuth = ({ isAdmin, children }) => isAdmin && children;

IsAuth.propTypes = {
  children: PropTypes.element.isRequired,
  isAdmin: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ currentUser }) => ({
  isAdmin: currentUser.user ? currentUser.user.isAdmin : false,
});

export default connect(mapStateToProps)(IsAuth);

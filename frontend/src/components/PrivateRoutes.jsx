import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) {
    toast.error('You must be logged in');
    return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user.role)) {
    toast.error(`Access denied for ${user.role}`);
    switch (user.role) {
      case 'user':
        return <Navigate to="/user/services" />;
      case 'provider':
        return <Navigate to="/provider/dashboard" />;
      case 'admin': 
        return <Navigate to="/admin/dashboard" />;
      default:
        return <Navigate to="/" />;
    }
  }

  return children;
};

export default PrivateRoute;

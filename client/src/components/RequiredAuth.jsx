import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
    const location = useLocation();
    const { inforUserLogin } = useSelector((state) => state.User);

    if (inforUserLogin === null) return '... LOADING ...';

    return inforUserLogin ? <Outlet /> : <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoute;

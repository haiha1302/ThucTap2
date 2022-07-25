import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/slice/userSlice'

const DropdownItem = (props) => {
    const dispatch = useDispatch()

    const logoutAcc = async () => {
        if (props.title === 'Đăng xuất tài khoản') {
            dispatch(logout())
        }
    }

    return (
        <Link to={props.path} className='modal-item' onClick={logoutAcc}>
            {props.title}
        </Link>
    );
};

export default DropdownItem;
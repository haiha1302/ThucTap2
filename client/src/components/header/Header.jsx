import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../redux/slice/userSlice';
import Navbar from './Navbar';
import DropMenu from '../DropMenu/DropMenu';
import { noAvatar } from '../../utils/contants';
import * as BiIcons from 'react-icons/bi';
import * as AiIcons from 'react-icons/ai'

const Header = () => {
    const [open, setOpen] = useState(false);
    const currentUser = useSelector((state) => state.User.inforUserLogin);
    const isAuth = currentUser ? true : false;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const scrollRef = useRef(null);

    useEffect(() => {
        dispatch(checkUser());
    }, [isAuth, dispatch]);

    useEffect(() => {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                scrollRef.current.classList.add('sticky');
            } else {
                scrollRef.current.classList.remove('sticky');
            }
        });
        return () => {
            window.removeEventListener('scroll', () => {});
        };
    });

    return (
        <header>
            <div className="header" ref={scrollRef}>
                <Navbar />
                <div className="logo">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/4922/4922073.png"
                        alt="logo"
                        className="logo-img"
                    />
                    <span>BlogApp</span>
                </div>
                <form>
                    <input type="text" placeholder="Search..." />
                    <span>
                        <AiIcons.AiOutlineSearch />
                    </span>
                </form>
                <div
                    className="header-blank header-nav"
                    onClick={() => {
                        navigate('/', { replace: true });
                    }}
                >
                    Trang chủ
                </div>
                <div onClick={() => setOpen(!open)} className="header-blank">
                    {isAuth === true ? (
                        <div className="header-user">
                            <img
                                src={currentUser.avatar ? currentUser.avatar : noAvatar}
                                alt={currentUser?.username}
                                className="header-avatar"
                            />
                            {currentUser?.username}
                            {open === true ? <DropMenu isAuth={isAuth} dataUserLogin={currentUser} /> : <></>}
                        </div>
                    ) : (
                        <div className='header-user'>
                            <BiIcons.BiUserCircle />
                            {open === true ? <DropMenu user={currentUser} /> : <></>}
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;

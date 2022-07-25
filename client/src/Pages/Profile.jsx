// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getProfileUser } from '../redux/slice/userSlice';
import { noAvatar } from '../utils/contants';
import { BiEdit } from 'react-icons/bi'
import '../sass/profile.scss';

const Profile = () => {
    // const idUser = useSelector((state) => state.User.inforUserLogin?._id);
    const profile = useSelector((state) => state.User.inforUserLogin);
    // const dispatch = useDispatch();
    // console.log(profile);
    // useEffect(() => {
    //     dispatch(getProfileUser(idUser));
    // }, [idUser, dispatch]);

    return (
        <div className="container-profile">
            <div className='profile-edit'>
                <BiEdit size={20} />
                <span>Chỉnh sửa thông tin</span>
            </div>
            <div className="avatar-user">
                <img src={profile?.avatar ? profile?.avatar : noAvatar} alt="avatar_user" className="avatar-img" />
            </div>
            <div className="infor-user">
                <div className='infor-user__name'>
                    <span>{profile?.username}</span>
                </div>
                <div className='infor-user__properties'>
                    <div className='property label-border'>Bài đăng: 0</div>
                    <div className='property label-border'>Lượt like: 0</div>
                    <div className='property'>Lượt theo dõi: 0</div>
                </div>
            </div>
        </div>
    );
};

export default Profile;

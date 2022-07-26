import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FaRegUserCircle } from 'react-icons/fa';
import { noAvatar } from '../utils/contants';
import { updateUserAvatar, updateInforUser } from '../redux/slice/userSlice';
import '../sass/settings.scss'

const Settings = () => {
    const user = useSelector((state) => state.User.inforUserLogin);
    const [updateInfor, setUpdateInfor] = useState({
        userId: user._id,
        email: user.email,
        username: user.username,
    });
    const [file, setFile] = useState(null);
    const [update, setUpdate] = useState(false);
    const [success, setSuccess] = useState(false);
    const dispatch = useDispatch();

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUpdateInfor({
            ...updateInfor,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (file) {
            const data = new FormData();
            const filename = Date.now() + file.name;
            data.append('file', file);
            data.append('userId', user._id);
            data.append('filename', filename);

            try {
                dispatch(updateUserAvatar(data));
            } catch (err) {
                console.log(err.message);
            }
        }

        try {
            dispatch(updateInforUser(updateInfor));
            setSuccess(!success);
            setUpdate(!update);
        } catch (err) {}
    };

    return (
        <div className="settings">
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="settingsUpdateTitle">Tài khoản người dùng</span>
                    <span className="settingsDeleteTitle" onClick={() => setUpdate(!update)}>
                        {update ? 'Hủy cập nhật' : 'Cập nhật thông tin'}
                    </span>
                </div>
                <form className="settingsForm" onSubmit={handleSubmit}>
                    <label>Profile Picture</label>
                    <div className="settingsPP">
                        <img src={file ? URL.createObjectURL(file) : user?.avatar ? user?.avatar : noAvatar} alt="" />
                        {update ? (
                            <>
                                <label htmlFor="fileInput">
                                    <FaRegUserCircle size={22} className="settingsPPIcon" />
                                </label>
                                <input
                                    type="file"
                                    id="fileInput"
                                    style={{ display: 'none' }}
                                    onChange={(e) => setFile(e.target.files[0])}
                                />
                            </>
                        ) : (
                            <></>
                        )}
                    </div>
                    <label>Username</label>
                    <input
                        type="text"
                        placeholder={user?.username}
                        onChange={onChangeInput}
                        disabled={update ? '' : 'disabled'}
                        name="username"
                    />
                    <label>Email</label>
                    <input
                        type="email"
                        placeholder={user?.email}
                        onChange={onChangeInput}
                        disabled={update ? '' : 'disabled'}
                        name="email"
                    />
                    <button className="settingsSubmit" type="submit">
                        Update
                    </button>
                    {success && (
                        <span style={{ color: 'green', textAlign: 'center', marginTop: '20px' }}>
                            Profile has been updated...
                        </span>
                    )}
                </form>
            </div>
        </div>
    );
};

export default Settings;

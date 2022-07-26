import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import FormInput from '../FormInput/FormInput';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { loginUser } from '../../redux/slice/userSlice';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../../sass/form.scss';

const FormLogin = () => {
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const [hidePassword, setHidePassword] = useState(true);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onChangeData = (e) => {
        const { name, value } = e.target;
        setData({
            ...data,
            [name]: value,
        });
    };

    const onLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(
                loginUser({
                    email: data.email,
                    password: data.password,
                }),
            );
            navigate('/', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container-form">
            <div className="form">
                <div className="form-content">
                    <header>Đăng nhập tài khoản</header>
                    <form onSubmit={onLoginSubmit}>
                        <div className="field input-field">
                            <FormInput
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={onChangeData}
                                inputMode="none"
                                name="email"
                            />
                        </div>
                        <div className="field input-field">
                            <FormInput
                                type={hidePassword === true ? 1 : 0}
                                placeholder="Mật khẩu"
                                value={data.password}
                                onChange={onChangeData}
                                inputMode="none"
                                name="password"
                            />
                            <div onClick={() => setHidePassword(!hidePassword)} className="eye-icon">
                                {hidePassword === true ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </div>
                        </div>

                        <div className="form-link">
                            <Link to={'/'} className="forgot-pass">
                                Quên mật khẩu?
                            </Link>
                        </div>

                        <div className="field button-field">
                            <ButtonSubmit event="Đăng nhập" />
                        </div>

                        <div className="form-link">
                            <span>
                                Chưa có tài khoản?{' '}
                                <Link to={'/register'} className="forgot-pass">
                                    Đăng ký
                                </Link>
                            </span>
                        </div>
                    </form>
                </div>

                <div className="line"></div>

                <div className="media-options">
                    <Link to={'/'} className="field field-oauth">
                        <img src="https://tinhte.vn/styles/tinhte2018/facebook.png" alt="" className="google-img" />
                        <span>Đăng nhập bằng Facebook</span>
                    </Link>

                    <Link to={'/'} className="field field-oauth">
                        <img src="https://tinhte.vn/styles/tinhte2018/google.png" alt="" className="google-img" />
                        <span>Đăng nhập bằng Google</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default FormLogin;

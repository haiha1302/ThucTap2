import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { loginUser } from '../../redux/slice/userSlice';
import Errors from '../Errors/Errors';
import { IoArrowBackOutline } from 'react-icons/io5';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import '../../sass/form.scss';

const FormLogin = () => {
    const { inforUserLogin, errorLogin } = useSelector((state) => state.User);
    const [hidePassword, setHidePassword] = useState(true);
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const onLoginSubmit = (data) => {
        try {
            dispatch(loginUser(data));
        } catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        if (inforUserLogin) {
            navigate('/', { replace: true });
        }
    }, [inforUserLogin, navigate]);

    return (
        <div className="container-form">
            <div className="form">
                <div className="form-content">
                    <IoArrowBackOutline
                        size={25}
                        onClick={() => {
                            navigate(-1);
                        }}
                    />
                    <header>Đăng nhập tài khoản</header>
                    {errorLogin ? <span style={{ color: 'red', alignItem: 'center' }}>{errorLogin}</span> : <></>}
                    <form onSubmit={handleSubmit(onLoginSubmit)}>
                        <div className="field input-field">
                            <input
                                placeholder="Email"
                                {...register('email', {
                                    required: 'Email không được để trống',
                                    pattern: {
                                        value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                                        message: 'Email không hợp lệ',
                                    },
                                })}
                            />
                        </div>
                        {errors && <Errors>{errors.email?.message}</Errors>}
                        <div className="field input-field">
                            <input
                                type={hidePassword === true ? 'password' : 'text'}
                                placeholder="Mật khẩu"
                                {...register('password', {
                                    required: 'Mật khẩu không được để trống',
                                    minLength: {
                                        value: 8,
                                        message: 'Mật khẩu có ít nhất 8 ký tự',
                                    },
                                })}
                            />
                            <div onClick={() => setHidePassword(!hidePassword)} className="eye-icon">
                                {hidePassword === true ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </div>
                        </div>
                        {errors && <Errors>{errors.password?.message}</Errors>}
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

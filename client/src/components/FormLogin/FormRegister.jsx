import { useRef, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import Errors from '../Errors/Errors';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { IoArrowBackOutline } from 'react-icons/io5';
import { registerUser } from '../../redux/slice/userSlice';
import '../../sass/form.scss';

const FormRegister = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        watch,
    } = useForm();
    const [hidePass, setHidePass] = useState(true);
    const [hidePassAgain, setHidePassAgain] = useState(true);
    const password = useRef({});
    password.current = watch('password', '');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onRegisterSubmit = (data) => {
        try {
            dispatch(registerUser(data));
            navigate('/validate-otp', { replace: true });
        } catch (error) {
            console.log(error.message);
        }
    };

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
                    <header>Đăng ký tài khoản</header>
                    <form onSubmit={handleSubmit(onRegisterSubmit)}>
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
                                placeholder="Tên"
                                {...register('username', {
                                    required: 'Tên người dùng không được để trống',
                                })}
                            />
                        </div>
                        {errors && <Errors>{errors.username?.message}</Errors>}
                        <div className="field input-field">
                            <input
                                type={hidePass === true ? 'password' : 'text'}
                                placeholder="Mật khẩu"
                                {...register('password', {
                                    required: 'Mật khẩu không được để trống',
                                    minLength: {
                                        value: 8,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự',
                                    },
                                })}
                            />
                            <div onClick={() => setHidePass(!hidePass)} className="eye-icon">
                                {hidePass === true ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />}
                            </div>
                        </div>
                        {errors && <Errors>{errors.password?.message}</Errors>}
                        <div className="field input-field">
                            <input
                                type={hidePassAgain === true ? 'password' : 'text'}
                                placeholder="Nhập lại mật khẩu"
                                {...register('cPassword', {
                                    required: 'Xác nhận mật khẩu không được để trống',
                                    minLength: {
                                        value: 8,
                                        message: 'Mật khẩu phải có ít nhất 8 ký tự',
                                    },
                                    validate: (value) => value === password.current || 'Mật khẩu không trùng khớp',
                                })}
                            />
                            <div onClick={() => setHidePassAgain(!hidePassAgain)} className="eye-icon">
                                {hidePassAgain === true ? (
                                    <AiOutlineEyeInvisible size={20} />
                                ) : (
                                    <AiOutlineEye size={20} />
                                )}
                            </div>
                        </div>
                        {errors && <Errors>{errors.cPassword?.message}</Errors>}
                        <div className="field input-field">
                            <input
                                type="date"
                                placeholder="Ngày sinh"
                                {...register('dateOfBirth', {
                                    required: 'Ngày sinh không được để trống',
                                })}
                            />
                        </div>
                        {errors && <Errors>{errors.dateOfBirth?.message}</Errors>}
                        <div className="field button-field">
                            <ButtonSubmit event="Đăng ký" />
                        </div>

                        <div className="form-link">
                            <span>
                                Bạn đã có tài khoản{' '}
                                <Link to={'/login'} className="forgot-pass">
                                    Đăng nhập
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

export default FormRegister;

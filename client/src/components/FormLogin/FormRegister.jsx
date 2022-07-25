import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; 
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import FormInput from '../FormInput/FormInput';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { registerUser } from '../../redux/slice/userSlice';
import { noAvatar } from '../../utils/contants'
import '../../sass/form.scss';

const FormRegister = () => {
    const [data, setData] = useState({
        email: '',
        username: '',
        password: '',
        passwordAgain: '',
        dateOfBirth: ''
    })
    const [hidePass, setHidePass] = useState(true)
    const [hidePassAgain, setHidePassAgain] = useState(true)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const onChangeData = e => {
        const { name, value } = e.target
        setData({
            ...data,
            [name]: value
        })
    }

    const onRegisterSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(registerUser({
                email: data.email,
                username: data.username,
                password: data.password,
                dateOfBirth: data.dateOfBirth,
                // avatar: noAvatar
            }))
            navigate('/validate-otp', { replace: true })
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="container-form">
            <div className="form">
                <div className="form-content">
                    <header>Đăng ký tài khoản</header>
                    <form onSubmit={onRegisterSubmit}>
                        <div className="field input-field">
                            <FormInput
                                type="email"
                                placeholder="Email"
                                value={data.email}
                                onChange={onChangeData}
                                name='email'
                            />
                        </div>
                        <div className="field input-field">
                            <FormInput
                                type="text"
                                placeholder="Tên"
                                value={data.username}
                                onChange={onChangeData}
                                inputMode='none'
                                name='username'
                            />
                        </div>
                        <div className="field input-field">
                            <FormInput
                                type={hidePass === true ? 1 : 0}
                                placeholder="Mật khẩu"
                                value={data.password}
                                onChange={onChangeData}
                                inputMode='none'
                                name='password'
                            />
                            <div onClick={() => setHidePass(!hidePass)} className='eye-icon'>
                                {
                                    hidePass === true ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
                                }
                            </div>
                        </div>
                        <div className="field input-field">
                            <FormInput
                                type={hidePassAgain === true ? 1 : 0}
                                placeholder="Nhập lại mật khẩu"
                                value={data.passwordAgain}
                                onChange={onChangeData}
                                inputMode='none'
                                name='passwordAgain'
                            />
                             <div onClick={() => setHidePassAgain(!hidePassAgain)} className='eye-icon'>
                                {
                                    hidePassAgain === true ? <AiOutlineEyeInvisible size={20} /> : <AiOutlineEye size={20} />
                                }
                            </div>
                        </div>
                        <div className="field input-field">
                            <FormInput
                                type="date"
                                placeholder="Ngày sinh"
                                value={data.dateOfBirth}
                                onChange={onChangeData}
                                inputMode='none'
                                name='dateOfBirth'
                            />
                        </div>
                        <div className='field button-field'>
                            {/* <Link to={'/validate-otp'}> */}
                                <ButtonSubmit event='Đăng ký' />
                            {/* </Link> */}
                        </div>

                        <div className="form-link">
                            <span>Bạn đã có tài khoản <Link to={'/login'} className="forgot-pass">Đăng nhập</Link></span>
                        </div>
                    </form>
                </div>

                <div className='line'></div>

                <div className="media-options">
                    <Link to={'/'} className="field field-oauth">
                        <img src='https://tinhte.vn/styles/tinhte2018/facebook.png' alt='' className='google-img' />
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

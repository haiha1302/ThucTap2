import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../redux/slice/userSlice';
import FormInput from '../FormInput/FormInput';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import '../../sass/otp.scss';

const FormValidateOtp = () => {
    const [otp, setOtp] = useState('');
    const [time, setTime] = useState('4');
    const emailUser = useSelector(state => state.User.email?.email)
    const dispatch = useDispatch()
    const navigate = useNavigate()
   
    const handleTime = () => {
        setTimeout(() => {
            setTime((prev) => prev - 1);
        }, 1000);
    };

    const submitOTP = (e) => {
        e.preventDefault()

        try {
            dispatch(verifyOtp({
                email: emailUser,
                otp: otp
            }))
            navigate('/', { replace: true })
        } catch(err) {
            console.log(err.message);
        }
    }

    useEffect(() => {
        handleTime();
    });

    return (
        <div className="container-form">
            <div className="form">
                <header>Nhập mã OTP của bạn</header>
                <span>
                    Mã OTP được gửi qua địa chỉ email của bạn. Mã sẽ hết hạn sau {time < '0' ? 'hết time' : time}s
                </span>
                <form onSubmit={submitOTP}>
                    <div>
                        <div>
                            <FormInput type="text" value={otp} onChange={(e) => setOtp(e.target.value)} />
                        </div>
                        <div>
                            <button>Gửi lại mã</button>
                        </div>
                    </div>
                    <div>
                        <ButtonSubmit event="Xác nhận" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormValidateOtp;

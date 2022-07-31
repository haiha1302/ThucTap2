import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyOtp } from '../../redux/slice/userSlice';
import ButtonSubmit from '../ButtonSubmit/ButtonSubmit';
import '../../sass/otp.scss';

const FormValidateOtp = () => {
    const [otp, setOtp] = useState('');
    const emailUser = useSelector((state) => state.User.email?.email);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitOTP = (e) => {
        e.preventDefault();

        try {
            dispatch(
                verifyOtp({
                    email: emailUser,
                    otp: otp,
                }),
            );
            navigate('/', { replace: true });
        } catch (err) {
            console.log(err.message);
        }
    };

    return (
        <div className="container-form">
            <div className="form">
                <header>Nhập mã OTP của bạn</header>
                <span>Mã OTP được gửi qua địa chỉ email của bạn.</span>
                <form onSubmit={submitOTP}>
                    <div>
                        <input
                            type="text"
                            placeholder="Nhập mã OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            inputMode={'numeric'}
                            required
                        />
                    </div>

                    <div style={{ marginTop: '20px' }}>
                        <ButtonSubmit event="Xác nhận" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default FormValidateOtp;

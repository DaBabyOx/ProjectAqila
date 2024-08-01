import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style.css';
import {toast, ToastContainer} from "react-toastify";

export default function OTP() {
    const email = localStorage.getItem("email") || "Manager Email";
    const [otp, setOtp] = useState(['', '', '', '']);
    const navigate = useNavigate();

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            if (value !== '' && index < 3) {
                document.getElementById(`otp-input-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = otp.join('');
        const secret = localStorage.getItem("otpSecret");

        console.log("Token:", token);
        console.log("Secret:", secret);

        try {
            const response = await axios.post('http://localhost:5000/manager/verify-otp', {
                token,
                secret
            });

            if (response.status === 200) {
                console.log("OTP verified:", response.data);
                navigate("/new-password");
            } else {
                toast.error("❌ Invalid OTP.");
            }
        } catch (error) {
            toast.error("❌ Failed to Verify OTP");
            console.error("Error verifying OTP:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center justify-center align-bottom" onSubmit={handleSubmit}>
                <div className="pb-3">
                    <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Check Your Email</h1>
                </div>
                <p className="text-white text-[16px] font-montserrat font-medium w-[373px] text-center pt-4 mb-6">
                    We sent a reset link to {email}. Enter the 4-digit code mentioned in the email.
                </p>
                <div className="flex space-x-2">
                    {otp.map((digit, index) => (
                        <input
                            key={index}
                            type="text"
                            maxLength="1"
                            value={digit}
                            id={`otp-input-${index}`}
                            onChange={(e) => handleChange(index, e.target.value)}
                            className="w-[60px] h-[60px] text-center border-2 rounded-md border-white bg-transparent text-white text-[32px] focus:outline-none focus:border-[#00aaff]"
                        />
                    ))}
                </div>
                <button type="submit" className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px] mt-4">VERIFY CODE</button>
                <div className="flex flex-row mt-1 space-x-2 justify-center items-center">
                    <p className="text-white font-montserrat font-medium text-[16px]">Haven&apos;t got the email yet?</p>
                    <p className="text-[#6EACDA] font-montserrat font-medium text-[16px] login-hover underline cursor-pointer">Resend email</p>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}

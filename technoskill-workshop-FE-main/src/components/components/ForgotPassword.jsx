import { MdOutlineMailOutline } from "react-icons/md";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function ForgotPassword() {
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [email, setEmail] = useState("");
    const [userNotFound, setUserNotFound] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/manager/forgot-password", {
                email: email
            });

            if (response.status === 200) {
                const otpResponse = await axios.post("http://localhost:5000/manager/generate-otp", {
                    email: email
                });
                localStorage.setItem("email", email);
                console.log("Email sent:", otpResponse.data);
                navigate("/otp");
            } else if (response.status === 404) {
                setUserNotFound(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setUserNotFound(true);
                toast.error("❌ User not found");
            } else {
                toast.error("❌ Failed to send email");
                console.error("Error:", error);
            }
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center justify-center align-bottom" onSubmit={handleSubmit}>
                <div className="pb-3">
                    <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Forgot Password?</h1>
                </div>
                <p className="text-white text-[16px] font-montserrat font-medium w-[373px] text-center pt-4 mb-6">
                    Enter the email address associated with your account.
                </p>
                <div className="p-2 relative">
                    <MdOutlineMailOutline
                        className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isEmailFocused ? 'text-white' : 'text-gray-400'}`}
                        size={20} />
                    <input
                        className={`w-[300px] h-[45px] pl-10 p-5 border border-1 ${userNotFound ? 'border-red-500' : 'border-gray-300'} bg-[#021526] font-light text-white rounded-[4px] font-montserrat`}
                        type="text"
                        placeholder="E-MAIL"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value);
                            setUserNotFound(false);
                        }}
                        onFocus={() => {
                            setIsEmailFocused(true);
                            setUserNotFound(false);
                        }}
                        onBlur={() => setIsEmailFocused(false)} />
                    {userNotFound && (
                        <p className="text-red-500 text-xs absolute left-5 bottom-[-10px]">Email not found</p>
                    )}
                </div>
                <button type="submit" className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px] mt-4">RESET PASSWORD</button>
            </form>
            <ToastContainer />
        </div>
    );
}
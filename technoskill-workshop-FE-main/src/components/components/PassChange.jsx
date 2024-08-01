import { useState } from "react";
import { CgLock } from "react-icons/cg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function PasswordChange() {
    const [password, setPassword] = useState("");
    const [passwordd, setPasswordd] = useState("");
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [isPassworddFocused, setIsPassworddFocused] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [sameAsOldPassword, setSameAsOldPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const oldPassword = localStorage.getItem("password");

        if (password !== passwordd) {
            setPasswordMismatch(true);
            return;
        }

        if (password === oldPassword) {
            setSameAsOldPassword(true);
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/manager/change-password", {
                password: password
            });

            if (response.status === 200) {
                toast.success("✅ Password changed successfully");
                navigate("/login");
            } else {
                toast.error("❌ Failed to change password");
            }
        } catch (error) {
            toast.error("❌ Failed to change password");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center justify-center align-bottom" onSubmit={handleSubmit}>
                <div className="pb-3">
                    <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Create New Password</h1>
                </div>
                <p className="text-white text-[16px] font-montserrat font-medium w-[373px] text-center pt-4 mb-6">
                    Your new password must be different from previous used passwords.
                </p>
                <div className="p-2 relative">
                    <CgLock
                        className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isPasswordFocused ? 'text-white' : 'text-gray-400'}`}
                        size={20} />
                    <input
                        className="w-[300px] h-[45px] pl-10 p-5 border border-1 border-gray-300 bg-[#021526] font-light text-white rounded-[4px] font-montserrat"
                        type="password"
                        placeholder="Enter your new password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setPasswordMismatch(false);
                            setSameAsOldPassword(false);
                        }}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)} />
                </div>
                <div className="p-2 relative">
                    <CgLock
                        className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isPassworddFocused ? 'text-white' : 'text-gray-400'}`}
                        size={20} />
                    <input
                        className="w-[300px] h-[45px] pl-10 p-5 border border-1 border-gray-300 bg-[#021526] font-light text-white rounded-[4px] font-montserrat"
                        type="password"
                        placeholder="Re-enter password"
                        value={passwordd}
                        onChange={(e) => {
                            setPasswordd(e.target.value);
                            setPasswordMismatch(false);
                            setSameAsOldPassword(false);
                        }}
                        onFocus={() => setIsPassworddFocused(true)}
                        onBlur={() => setIsPassworddFocused(false)} />
                    {passwordMismatch && (
                        <p className="text-red-500 text-xs absolute left-5 bottom-[-10px]">Passwords do not match</p>
                    )}
                    {sameAsOldPassword && (
                        <p className="text-red-500 text-xs absolute left-5 bottom-[-10px]">New password must be different from the old password</p>
                    )}
                </div>
                <button type="submit" className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px] mt-4">
                    CHANGE PASSWORD
                </button>
            </form>
            <ToastContainer />
        </div>
    );
}
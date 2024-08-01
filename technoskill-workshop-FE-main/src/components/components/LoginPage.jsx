import { useState } from "react";
import { GoPerson } from "react-icons/go";
import { CgLock } from "react-icons/cg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import './style.css';

export default function LoginPage() {
    const [isUsernameFocused, setIsUsernameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userNotFound, setUserNotFound] = useState(false);
    const [wrongPassword, setWrongPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/manager/login", {
                name: name,
                password: password,
            });

            if (response.status === 200) {
                const data = await response.data;
                console.log("Login success:", data);
                localStorage.setItem("uname", name);
                navigate("/success");
            } else if (response.status === 404) {
                setUserNotFound(true);
            } else if (response.status === 401) {
                setWrongPassword(true);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setUserNotFound(true);
                toast.error("❌ User not found");
            } else if (error.response && error.response.status === 401) {
                setWrongPassword(true);
                toast.error("❌ Wrong password");
            } else {
                toast.error("❌ Failed to login");
                console.error("Error:", error);
            }
        }
    };

    const handleForgotPasswordClick = () => {
        navigate("/forgot-password");
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center justify-center align-bottom" onSubmit={handleSubmit}>
                <div className="pb-3">
                    <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Welcome Back!</h1>
                </div>
                <div className="flex flex-col">
                    <div className="p-2 relative">
                        <GoPerson
                            className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isUsernameFocused ? 'text-white' : 'text-gray-400'}`}
                            size={20} />
                        <input
                            className={`w-[300px] h-[45px] pl-10 p-5 border border-1 ${userNotFound ? 'border-red-500' : 'border-gray-300'} bg-[#021526] font-light text-white rounded-[4px] font-montserrat`}
                            type="text"
                            placeholder="USERNAME"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setUserNotFound(false);
                            }}
                            onFocus={() => {
                                setIsUsernameFocused(true);
                                setUserNotFound(false);
                            }}
                            onBlur={() => setIsUsernameFocused(false)} />
                        {userNotFound && (
                            <p className="text-red-500 text-xs absolute left-5 bottom-[-10px]">User not found</p>
                        )}
                    </div>
                    <div className="items-end justify-end text-end text-[9px] text-white font-medium translate-x-0.4 mr-2 font-montserrat forgot-password">
                        <p className="cursor-pointer" onClick={handleForgotPasswordClick}>Forgot Password?</p>
                    </div>
                    <div className="p-2 relative">
                        <CgLock
                            className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isPasswordFocused ? 'text-white' : 'text-gray-400'}`}
                            size={20} />
                        <input
                            className={`w-[300px] h-[45px] pl-10 p-5 border border-1 ${wrongPassword ? 'border-red-500' : 'border-gray-300'} bg-[#021526] font-light text-white rounded-[4px] font-montserrat`}
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setWrongPassword(false);
                            }}
                            onFocus={() => {
                                setIsPasswordFocused(true);
                                setWrongPassword(false);
                            }}
                            onBlur={() => setIsPasswordFocused(false)} />
                        {wrongPassword && (
                            <p className="text-red-500 text-xs absolute left-5 bottom-[-10px]">Wrong password</p>
                        )}
                    </div>
                    <div className="items-start justify-start text-start text-[9px] text-white font-medium flex flex-row mt-2 ml-2 font-montserrat">
                        <div>
                            <input type="checkbox" className="mr-2" />
                        </div>
                        <p>Remember for 30 days</p>
                    </div>
                    <div className="flex justify-center w-full mt-4">
                        <button type="submit" className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px]">LOGIN</button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
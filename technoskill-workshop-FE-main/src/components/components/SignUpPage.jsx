import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import './style.css';
import { GoPerson } from "react-icons/go";
import { CgLock } from "react-icons/cg";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SignUpPage() {
    const [isFullNameFocused, setIsFullNameFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/manager/register", {
                name: name,
                password: password,
            });

            if (response.status === 201) {
                const data = await response.data;
                console.log("Register success:", data);
                navigate("/login");
            }
        } catch (error) {
            toast.error("❌ Failed to Register");
            console.error("Error:", error);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center justify-center align-bottom" onSubmit={handleSubmit}>
                <div className="flex flex-col items-start w-full">
                    <div className="flex justify-start text-start">
                        <p className="font-medium text-[16px] text-white font-montserrat">WELCOME!</p>
                    </div>
                    <div className="flex justify-start text-start">
                        <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Join The Community</h1>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="p-2 relative">
                        <GoPerson
                            className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isFullNameFocused ? 'text-white' : 'text-gray-400'}`}
                            size={20} />
                        <input
                            className="w-[300px] h-[45px] pl-10 p-5 border border-1 bg-[#021526] font-light text-white rounded-[4px] font-montserrat"
                            type="text"
                            placeholder="FULLNAME"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onFocus={() => setIsFullNameFocused(true)}
                            onBlur={() => setIsFullNameFocused(false)} />
                    </div>
                    <div className="p-2 relative">
                        <CgLock
                            className={`absolute left-5 top-1/2 transform -translate-y-1/2 ${isPasswordFocused ? 'text-white' : 'text-gray-400'}`}
                            size={20} />
                        <input
                            className="w-[300px] h-[45px] pl-10 p-5 border border-1 bg-[#021526] font-light text-white rounded-[4px] font-montserrat"
                            type="password"
                            placeholder="PASSWORD"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onFocus={() => setIsPasswordFocused(true)}
                            onBlur={() => setIsPasswordFocused(false)} />
                    </div>
                    <div className="flex justify-center w-full mt-4">
                        <button
                            className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px]">SIGN UP
                        </button>
                    </div>
                    <div className="flex flex-row mt-1 space-x-2 justify-center items-center">
                        <p className="text-white font-montserrat font-medium text-[16px]">Already have an account?</p>
                        <p className="text-[#E2E2B6] font-montserrat font-medium text-[16px] login-hover" onClick={handleLoginClick}>Login</p>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
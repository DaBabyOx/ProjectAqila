import profile from "./assets/profile.png";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function EditInfo() {
    const navigate = useNavigate();
    const uname = localStorage.getItem("uname") || "User";
    const [namee, setNamee] = useState("");
    const [rolePos, setRolePos] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [isNameFocused, setIsNameFocused] = useState(false);
    const [isRoleFocused, setIsRoleFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isAddressFocused, setIsAddressFocused] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!namee || !rolePos || !mobilePhone || !email || !address) {
            toast.error("❌ All fields are required");
            return;
        }

        if (!/^\d+$/.test(mobilePhone)) {
            toast.error("❌ Phone number must contain only numeric characters");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/manager/edit", {
                namee,
                rolePos,
                mobilePhone,
                email,
                address,
                name: uname
            });

            if (response.status === 200) {
                toast.success("✅ Info updated successfully");
                navigate("/my-info");
            } else {
                toast.error("❌ Failed to update info");
            }
        } catch (error) {
            toast.error("❌ Failed to update info");
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-row items-center gap-5 justify-between align-bottom" onSubmit={handleSubmit}>
                <div className="flex flex-row gap-[200px] justify-between items-start text-start">
                    <div className="flex flex-col items-center justify-center align-bottom">
                        <div className="pb-3">
                            <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">Edit Info</h1>
                        </div>
                        <div className="image-container">
                            <img src={profile} alt="Foto" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center align-bottom">
                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Name
                            </p>
                            <div className="relative pb-5">
                                <input
                                    className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isNameFocused ? 'text-white' : 'text-gray-400'}`}
                                    type="text"
                                    placeholder="Enter your full name"
                                    value={namee}
                                    onChange={(e) => setNamee(e.target.value)}
                                    onFocus={() => setIsNameFocused(true)}
                                    onBlur={() => setIsNameFocused(false)} />
                            </div>

                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Role Position
                            </p>
                            <div className="relative pb-5">
                                <input
                                    className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isRoleFocused ? 'text-white' : 'text-gray-400'}`}
                                    type="text"
                                    placeholder="Enter your role position"
                                    value={rolePos}
                                    onChange={(e) => setRolePos(e.target.value)}
                                    onFocus={() => setIsRoleFocused(true)}
                                    onBlur={() => setIsRoleFocused(false)} />
                            </div>

                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Mobile Phone
                            </p>
                            <div className="relative pb-5">
                                <input
                                    className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isPhoneFocused ? 'text-white' : 'text-gray-400'}`}
                                    type="text"
                                    placeholder="Enter your mobile phone"
                                    value={mobilePhone}
                                    onChange={(e) => setMobilePhone(e.target.value)}
                                    onFocus={() => setIsPhoneFocused(true)}
                                    onBlur={() => setIsPhoneFocused(false)} />
                            </div>

                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Email
                            </p>
                            <div className="relative pb-5">
                                <input
                                    className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isEmailFocused ? 'text-white' : 'text-gray-400'}`}
                                    type="text"
                                    placeholder="Enter your Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onFocus={() => setIsEmailFocused(true)}
                                    onBlur={() => setIsEmailFocused(false)} />
                            </div>

                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Address
                            </p>
                            <div className="relative pb-5">
                                <input
                                    className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isAddressFocused ? 'text-white' : 'text-gray-400'}`}
                                    type="text"
                                    placeholder="Enter your address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    onFocus={() => setIsAddressFocused(true)}
                                    onBlur={() => setIsAddressFocused(false)} />
                            </div>

                            <div className="flex flex-row text-center justify-between w-full mt-1">
                                <button
                                    className="bg-white w-[136px] h-[45px] rounded-[4px] font-montserrat font-semibold text-[#03346E]"
                                    onClick={() => navigate('/my-info')}>
                                    BACK
                                </button>
                                <button
                                    className="bg-white w-[136px] h-[45px] rounded-[4px] font-montserrat font-semibold text-[#03346E]">
                                    SAVE
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddEmployeePage() {
    const navigate = useNavigate();
    const [isFirstFocused, setIsFirstFocused] = useState(false);
    const [isLastFocused, setIsLastFocused] = useState(false);
    const [isRoleFocused, setIsRoleFocused] = useState(false);
    const [isPhoneFocused, setIsPhoneFocused] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isAddressFocused, setIsAddressFocused] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [mobilePhone, setMobilePhone] = useState("");
    const [rolePos, setRolePos] = useState("");
    const [address, setAddress] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!firstName || !lastName || !email || !mobilePhone || !rolePos || !address) {
            toast.error("❌ All fields are required");
            return;
        }

        if (!/^\d+$/.test(mobilePhone)) {
            toast.error("❌ Phone number must contain only numeric characters");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/employee/add", {
                firstName: firstName,
                lastName: lastName,
                email: email,
                mobilePhone: mobilePhone,
                rolePos: rolePos,
                address: address,
            });

            if (response.status === 201) {
                const data = await response.data;
                toast.success("Employee added successfully");
                localStorage.setItem("ename", `${firstName} ${lastName}`);
                localStorage.setItem("email", email);
                localStorage.setItem("phone", mobilePhone);
                localStorage.setItem("role", rolePos);
                localStorage.setItem("address", address);
                console.log("Employee added successfully:", data);
                navigate('/addition-success');
            } else {
                toast.error("❌ Failed to add employee");
                console.error("Failed to add employee");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <form className="flex flex-col items-center gap-5" onSubmit={handleSubmit}>
                <p className="font-league-spartan font-bold text-[#E2E2B6] text-[55px]">Create Employee</p>
                <div className="flex flex-row gap-10">
                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                First Name
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isFirstFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                onFocus={() => setIsFirstFocused(true)}
                                onBlur={() => setIsFirstFocused(false)}
                            />
                        </div>

                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Last Name
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isLastFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's last name"
                                value={lastName}
                                onChange={(e) => {
                                    console.log("Last Name Changed:", e.target.value); // Debugging
                                    setLastName(e.target.value);
                                }}
                                onFocus={() => setIsLastFocused(true)}
                                onBlur={() => setIsLastFocused(false)}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-5">
                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Email
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isEmailFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                onFocus={() => setIsEmailFocused(true)}
                                onBlur={() => setIsEmailFocused(false)}
                            />
                        </div>

                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Mobile Phone
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isPhoneFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's mobile phone"
                                value={mobilePhone}
                                onChange={(e) => setMobilePhone(e.target.value)}
                                onFocus={() => setIsPhoneFocused(true)}
                                onBlur={() => setIsPhoneFocused(false)}
                            />
                        </div>

                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Role Position
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isRoleFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's role position"
                                value={rolePos}
                                onChange={(e) => setRolePos(e.target.value)}
                                onFocus={() => setIsRoleFocused(true)}
                                onBlur={() => setIsRoleFocused(false)}
                            />
                        </div>

                        <div>
                            <p className="font-inter font-semibold text-[16px] text-[#E2E2B6]">
                                Address
                            </p>
                            <input
                                className={`w-[300px] h-[45px] p-3 border border-1 bg-[#021526] rounded-[4px] font-montserrat font-medium ${isAddressFocused ? 'text-white' : 'text-gray-400'}`}
                                type="text"
                                placeholder="Enter employee's address"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                onFocus={() => setIsAddressFocused(true)}
                                onBlur={() => setIsAddressFocused(false)}
                            />
                        </div>

                        <button type="submit" className="bg-white text-[#03346E] font-montserrat font-semibold text-[16px] w-[300px] h-[45px] rounded-[4px]">
                            ADD
                        </button>
                    </div>
                </div>
            </form>
            <ToastContainer />
        </div>
    );
}
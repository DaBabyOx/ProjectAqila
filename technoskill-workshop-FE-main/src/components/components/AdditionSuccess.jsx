import { useState } from 'react';
import profile from "./assets/profile.png";
import DetailPopUp from './DetailPopUp';
import {useNavigate} from "react-router-dom";

export default function AdditionSuccess() {
    const [showOverlay, setShowOverlay] = useState(false);
    const navigate = useNavigate();

    const handleAddClick = () => {
        navigate('/add-employee');
    }

    const handleContinueClick = () => {
        setShowOverlay(true);
    }

    const handleCloseOverlay = () => {
        setShowOverlay(false);
    }

    const ename = localStorage.getItem("ename") || "employee";

    return (
        <div className="relative flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center">
                <p className="text-white text-[16px] font-montserrat font-medium w-[373px] text-center pt-4 mb-6">
                    Congratulations! {ename}&apos;s Information has been added. Click continue to go to the home page
                </p>
                <div className="image-container mb-6">
                    <img src={profile} alt="Foto" className="border-4 border-white" />
                </div>
                <div className="flex flex-col items-center w-full">
                    <button
                        className="mb-3 font-semibold w-[300px] h-[45px] bg-white rounded-[4px] text-[#03346E] font-montserrat text-[16px]"
                        onClick={handleAddClick}>
                        ADD MORE
                    </button>
                    <button
                        className="font-semibold w-[300px] h-[45px] bg-white rounded-[4px] text-[#03346E] font-montserrat text-[16px]"
                        onClick={handleContinueClick}>
                        CONTINUE
                    </button>
                </div>
            </div>
            {showOverlay && <DetailPopUp Close={handleCloseOverlay} />}
        </div>
    );
}

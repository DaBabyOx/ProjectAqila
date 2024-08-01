import { useNavigate } from 'react-router-dom';
import './style.css';
import profile from "./assets/profile.png";

export default function MyInfoPage() {
    const navigate = useNavigate();
    const uname = (localStorage.getItem("uname") || "User").toUpperCase();
    const handleHomeClick = () => {
        navigate('/home');
    }
    const handleEditClick = () => {
        navigate('/edit-info');
    }
    return (
        <div>
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center">
                    <div className="pb-3">
                        <h1 className="font-bold text-[55px] text-[#E2E2B6] font-league-spartan">My Info</h1>
                    </div>
                    <div className="image-container">
                        <img src={profile} alt="Foto"/>
                    </div>
                    <div className="flex flex-col text-center justify-center w-full">
                        <div
                            className="flex items-center justify-center w-[300px] h-[45px] bg-[#03346E] text-[#E2E2B6] rounded-[4px] font-montserrat text-[16px] font-semibold mb-5">
                            {uname}
                        </div>
                        <div
                            className="flex items-center justify-center w-[300px] h-[45px] bg-[#E2E2B6] text-[#03346E] rounded-[4px] font-montserrat text-[16px] font-semibold mb-8">
                            MANAGER
                        </div>
                    </div>
                    <div className="flex flex-row text-center justify-between w-full mt-8 py-5">
                        <button
                            className="bg-white w-[136px] h-[45px] rounded-[4px] font-montserrat font-semibold text-[#03346E]" onClick={handleEditClick}>
                            EDIT
                        </button>
                        <button
                            className="bg-white w-[136px] h-[45px] rounded-[4px] font-montserrat font-semibold text-[#03346E]" onClick={handleHomeClick}>
                            CONTINUE
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
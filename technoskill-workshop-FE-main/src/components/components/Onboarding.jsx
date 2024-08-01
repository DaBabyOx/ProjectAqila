import { useNavigate } from 'react-router-dom';
import profile from './assets/profile.png';
import './style.css';

export default function Onboarding() {
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');}
    const handleSignUpClick = () => {
        navigate('/sign-up');}

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center align-bottom">
                <div className="image-container">
                    <img src={profile} alt="Foto" />
                </div>
                <div className="flex flex-col justify-center w-full mt-4">
                    <button
                        className="mb-5 font-semibold w-[300px] h-[45px] bg-[#03346E] items-center justify-center rounded-[4px] text-[#E2E2B6] font-montserrat text-[16px]" onClick = {handleLoginClick}>LOGIN
                    </button>
                    <button
                        className="font-semibold w-[300px] h-[45px] bg-[#E2E2B6] items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px]" onClick = {handleSignUpClick}>SIGN UP
                    </button>
                </div>
            </div>
        </div>)}
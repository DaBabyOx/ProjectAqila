import { useNavigate } from 'react-router-dom';
export default function LoginSuccessPage() {
    const navigate = useNavigate();
    const handleContinueClick = () => {
        navigate('/home');}

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="flex flex-col items-center justify-center align-bottom">
                <div className="pb-1">
                    <h1 className= "font-bold text-[55px] text-[#E2E2B6] font-league-spartan">SUCCESSFUL</h1>
                </div>
                <div className="pb-5">
                    <p className="font-montserrat text-[16px] text-white">Click continue to login</p>
                </div>
                <div className="flex justify-center w-full mt-4">
                    <button
                        className="font-semibold w-[300px] h-[45px] bg-white items-center justify-center rounded-[4px] text-[#03346E] font-montserrat text-[16px]" onClick = {handleContinueClick}>CONTINUE
                    </button>
                </div>
            </div>
        </div>)}
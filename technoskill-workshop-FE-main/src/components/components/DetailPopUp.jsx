import { useNavigate } from 'react-router-dom';

export default function DetailPopUp({ Close }) {
    const navigate = useNavigate();

    const ename = localStorage.getItem("ename") || "employee";
    const email = localStorage.getItem("email") || "email";
    const phone = localStorage.getItem("phone") || "phone";
    const role = localStorage.getItem("role") || "role";
    const address = localStorage.getItem("address") || "address";

    const handleContinueClick = () => {
        navigate('/home');
    };

    const handleBackClick = () => {
        Close();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white w-[600px] h-[auto] p-8 rounded-lg shadow-lg">
                <div className="flex flex-col text-center items-center">
                    <h1 className="font-bold text-[35px] text-[#021526] font-league-spartan">Employee Details</h1>
                    <div className="w-[343px] h-[5px] bg-[#BFCBCE] mt-2"></div>
                </div>
                <div className="mt-[30px]">
                    <p className="font-semibold font-montserrat text-[20px] text-black mb-2">
                        Full Name: {ename}
                    </p>
                    <p className="font-semibold font-montserrat text-[20px] text-black mb-2">
                        Email: {email}
                    </p>
                    <p className="font-semibold font-montserrat text-[20px] text-black mb-2">
                        Mobile Phone: {phone}
                    </p>
                    <p className="font-semibold font-montserrat text-[20px] text-black mb-2">
                        Role Position: {role}
                    </p>
                    <p className="font-semibold font-montserrat text-[20px] text-black mb-2">
                        Address: {address}
                    </p>
                </div>
                <div className="flex justify-between w-full mt-[30px]">
                    <button
                        className="bg-[#03346E] w-[136px] h-[45px] rounded-[4px] text-[16px] font-montserrat font-semibold text-white"
                        onClick={handleContinueClick}>
                        CONTINUE
                    </button>
                    <button
                        className="bg-[#03346E] w-[136px] h-[45px] rounded-[4px] text-[16px] font-montserrat font-semibold text-white"
                        onClick={handleBackClick}>
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import personIcon from './assets/AddressBook.svg';
import addPersonIcon from './assets/user-plus.svg';
import employeeIcon from './assets/eye.svg';
import homeIcon from './assets/House.svg';
import sidebarIcon from './assets/sidebar.svg';
import logoutIcon from './assets/logout.svg';
import './style.css';

const menuItems = [
    { icon: <img src={personIcon} alt="My Info" className="w-10 h-10" />, text: 'My Info', route: '/my-info' },
    { icon: <img src={addPersonIcon} alt="Add Employee" className="w-10 h-10" />, text: 'Add Employee', route: '/add-employee' },
    { icon: <img src={employeeIcon} alt="View Employee" className="w-10 h-10" />, text: 'View Employee', route: '/view-employee' },
    { icon: <img src={homeIcon} alt="Home" className="w-10 h-10" />, text: 'Home' }
];

export default function SideBar() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const handleLogoutClick = () => {
        navigate('/onboarding');
    };

    const handleMenuItemClick = (route) => {
        navigate(route);
    };

    return (
        <div className={`h-screen w-16 bg-[#E2E2B6] absolute left-0 top-0 z-10 transition-width duration-500 ease-in-out group overflow-hidden ${isOpen ? 'hover:w-[347px]' : ''}`}
            onMouseEnter={() => setIsOpen(true)}
            onMouseLeave={() => setIsOpen(false)}
            style={{boxShadow: '4px 0 10px rgba(0, 0, 0, 0.2)' }}>
            <div className="flex flex-col items-center justify-start h-full pt-4 overflow-hidden">
                <div className="relative w-full bg-white h-[107px] flex items-center justify-center border-b border-gray-300 drop-shadow-lg overflow-hidden transition-all duration-500 ease-in-out">
                    <p
                        className={`absolute font-league-spartan font-bold text-[40px] text-[#021526] transition-opacity duration-500 ease-in-out ${
                            isOpen ? 'opacity-100' : 'opacity-0'
                        }`}>
                        Dashboard
                    </p>
                    <img
                        src={sidebarIcon}
                        alt="Sidebar"
                        className={`w-8 h-8 transition-opacity duration-500 ease-in-out filter-black ${isOpen ? 'opacity-0' : 'opacity-100'}`}
                    />
                </div>
                <div className="flex flex-col items-center justify-start h-full mt-4 overflow-hidden flex-grow">
                    {menuItems.map((item, index) => (
                        <button key={index} onClick={() => handleMenuItemClick(item.route)} className="relative flex items-center w-full mb-8 p-2 hover:bg-gray-200 cursor-pointer rounded overflow-hidden">
                            <div className="relative flex items-center justify-center w-16 h-16 text-3xl overflow-hidden">
                                {item.icon}
                            </div>
                            <div className="flex left-20 whitespace-nowrap overflow-hidden">
                                <p className="opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out text-[#021526] font-league-spartan font-bold text-[24px] ml-2">
                                    {item.text}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
                {isOpen && (
                    <div className="relative flex items-center w-full mb-8 p-2 cursor-pointer rounded overflow-hidden">
                        <div className="group w-full flex items-center justify-center">
                            <button onClick={handleLogoutClick} className="bg-white w-20 h-10 shadow-md flex items-center justify-center rounded group-hover:w-32 transition-all duration-500 ease-in-out">
                                <img src={logoutIcon} alt="Logout" className="w-6 h-6 mr-1" />
                                <p className="text-[#021526] font-league-spartan font-bold text-[16px]">
                                    Logout
                                </p>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
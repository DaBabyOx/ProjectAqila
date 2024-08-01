import profile from './assets/profile.png';
import SideBar from "./SideBar.jsx";

export default function HomePage() {
    const uname = localStorage.getItem("uname") || "User";

    return (
        <>
            <SideBar />
            <div className="flex items-center justify-center min-h-screen">
                <div className="flex flex-col items-center justify-center align-bottom">
                    <div>
                        <img src={profile} alt="Foto" />
                    </div>
                    <div>
                        <h1 className="font-league-spartan font-bold text-[55px] text-[#E2E2B6]">Welcome Home, {uname}!</h1>
                    </div>
                </div>
            </div>
        </>
    );
}
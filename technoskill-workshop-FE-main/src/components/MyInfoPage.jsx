import { useState } from "react";

import DashboardElement from "./elements/DashboardElement";

import employeeIcon from "./components/assets/employee.svg";

export default function MyInfoPage() {
  const [name, setName] = useState("");
  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <DashboardElement />

      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <img src={employeeIcon} className="w-[240px] mx-auto mt-24" />

        <p className="text-[30px] mx-auto mt-20">My Info</p>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
          />
        </div>
      </div>
    </div>
  );
}

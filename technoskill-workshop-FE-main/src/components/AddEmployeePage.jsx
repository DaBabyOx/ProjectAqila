import { useState } from "react";
import DashboardElement from "./elements/DashboardElement";
import axios from 'axios';

export default function AddEmployeePage() {
  const [name, setName] = useState("");
  const [division, setDivision] = useState("");
  const [salary, setSalary] = useState("");

  const handleAddEmployee = async () => {
    try {
      const response = await axios.post('http://localhost:8000/employee/add', {
        name,
        division,
        salary,
      });

      if(response.status !== 201) throw new Error("Add employee failed");

      console.log(response.data);

    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="bg-[#CED1DA] h-screen w-screen flex">
      <DashboardElement />

      <div className="bg-[#2B2E63] w-[622px] h-[675px] m-auto rounded-2xl flex flex-col text-white">
        <p className="text-[30px] mx-auto mt-20">Add New Employee</p>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Name</p>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Division</p>
          <input
            value={division}
            onChange={(e) => setDivision(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
          />
        </div>

        <div className="mx-auto mt-10">
          <p className="text-[20px]">Salary</p>
          <input
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            className="bg-[#BFCBCE] w-[343px] h-[41px] text-gray-700 px-2"
          />
        </div>

        <div className="mx-auto mt-20">
          <button className="bg-[#6F90AF] p-2 px-3 rounded-2xl" onClick={handleAddEmployee}>Add</button>
        </div>
      </div>
    </div>
  );
}

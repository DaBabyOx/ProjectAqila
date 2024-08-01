import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewEmployee() {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/employee/get')
            .then(response => {
                console.log(response.data);
                setEmployees(response.data);
            })
            .catch(error => {
                console.error('Error fetching employee data:', error);
            });
    }, []);

    const handleBackClick = () => {
        navigate('/home');
    };

    return (
        <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white w-[990px] h-[90vh] p-8 rounded-lg shadow-lg flex flex-col justify-between">
                <div className="flex flex-col text-center items-center">
                    <h1 className="font-bold text-[35px] text-[#021526] font-league-spartan">
                        Current Employees
                    </h1>
                    <div className="w-[343px] h-[5px] bg-[#BFCBCE] mt-2"></div>
                </div>

                <div className="flex-grow overflow-y-auto mt-6">
                    {employees.map((employee, index) => (
                        <div key={index} className="p-4 border-b border-gray-200">
                            <h2 className="text-xl font-semibold">{employee.firstname} {employee.lastname}</h2>
                            <p className="text-gray-600">{employee.email}</p>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end mt-4">
                    <button
                        className="bg-[#03346E] w-[136px] h-[45px] rounded-[4px] text-[16px] font-montserrat font-semibold text-white"
                        onClick={handleBackClick}
                    >
                        BACK
                    </button>
                </div>
            </div>
        </div>
    );
}
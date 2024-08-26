import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function EmployeeListPreview() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
        setEmployees(data.slice(0, 5)); // Display only the first 5 employees
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">Employee List</h2>
      {employees.length > 0 ? (
        <ul className="space-y-2">
          {employees.map((employee) => (
            <li key={employee.employeeId} className="p-4 bg-gray-100 rounded shadow">
              <strong>{employee.name}</strong> - {employee.position} in {employee.department}
              <div className="text-sm text-gray-600">{employee.email}</div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No employees found</p>
      )}
      <Link to="/employees" className="text-blue-500 hover:underline">View All Employees</Link>
    </div>
  );
}

export default EmployeeListPreview;

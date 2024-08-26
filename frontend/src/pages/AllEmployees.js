import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeList from '../components/EmployeeList';

function AllEmployees() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
        setEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Employees</h1>
      <EmployeeList employees={employees} />
    </div>
  );
}

export default AllEmployees;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import EmployeeList from '../components/EmployeeList';
import Sidebar from '../components/Sidebar';

function AllEmployees() {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const employeesPerPage = 10;

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API_URL}/api/employees`);
        setEmployees(data);
        setFilteredEmployees(data);
      } catch (error) {
        console.error('Failed to fetch employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    let filtered = employees;

    if (department) {
      filtered = filtered.filter(employee => employee.department === department);
    }

    if (position) {
      filtered = filtered.filter(employee => employee.position === position);
    }

    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredEmployees(filtered);
  }, [department, position, searchTerm, employees]);

  const handleDepartmentChange = (e) => {
    setDepartment(e.target.value);
    setCurrentPage(1);
  };

  const handlePositionChange = (e) => {
    setPosition(e.target.value);
    setCurrentPage(1);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Pagination
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

  const handleClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-row">
      <Sidebar />
      <div className="flex-grow p-6">
        <h1 className="text-2xl font-bold mb-4">All Employees</h1>

        {/* Filters */}
        <div className="mb-4 flex justify-between items-center">
          <div className="flex space-x-4">
            <select value={department} onChange={handleDepartmentChange} className="p-2 border border-gray-300 rounded">
              <option value="">All Departments</option>
              <option value="IT">IT</option>
              <option value="HR">HR</option>
              <option value="Finance">Finance</option>
              <option value="Marketing">Marketing</option>
              <option value="Sales">Sales</option>
            </select>

            <select value={position} onChange={handlePositionChange} className="p-2 border border-gray-300 rounded">
              <option value="">All Positions</option>
              <option value="Developer">Developer</option>
              <option value="Manager">Manager</option>
              <option value="Analyst">Analyst</option>
              <option value="Engineer">Engineer</option>
              <option value="Consultant">Consultant</option>
            </select>
          </div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Employee List */}
        <EmployeeList employees={currentEmployees} />

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`p-2 border border-gray-300 rounded mx-1 ${currentPage === index + 1 ? 'bg-gray-300' : 'bg-white'}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllEmployees;

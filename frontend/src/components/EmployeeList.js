import React from 'react';

function EmployeeList({ employees }) {
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
    </div>
  );
}

export default EmployeeList;

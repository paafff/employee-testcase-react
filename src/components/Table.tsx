import React from 'react';

interface User {
  name: string;
  email: string;
  password: string;
}

interface TableProps {
  users: User[];
}

const Table: React.FC<TableProps> = ({ users }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white dark:bg-gray-800">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
              Name
            </th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
              Email
            </th>
            <th className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
              Password
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index}>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {user.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {user.email}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 dark:border-gray-700">
                {user.password}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;

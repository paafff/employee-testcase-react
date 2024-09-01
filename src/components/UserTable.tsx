import React from 'react';

interface PendidikanTerakhir {
  id: number;
  name: string;
  educationLevel: string;
  major: string;
  graduationYear: number | null;
  biodataId: string;
}

interface RiwayatPekerjaan {
  id: number;
  industry: string;
  name: string;
  salary: number;
  year: number;
  biodataId: string;
}

interface RiwayatPelatihan {
  id: number;
  name: string;
  certificate: string;
  year: number;
  biodataId: string;
}

interface Biodata {
  id: string;
  positionApplied: string;
  fullName: string;
  gender: string;
  birthDetails: string;
  address: string;
  phone: string;
  email: string;
  pendidikanTerakhir: PendidikanTerakhir;
  riwayatPekerjaan: RiwayatPekerjaan[];
  riwayatPelatihan: RiwayatPelatihan[];
}

interface User {
  id: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  role: string;
  biodata: Biodata | null;
}

interface UserTableProps {
  users: User[];
  onDetails: (userId: string) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<UserTableProps> = ({
  users,
  onDetails,
  onDelete,
}) => {
  // Filter users to include only those with biodata
  const usersWithBiodata = users.filter((user) => user.biodata !== null);

  const handleDelete = (biodataId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this data?'
    );
    if (confirmed) {
      onDelete(biodataId);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="">
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Full Name</th>
            <th className="py-2 px-4 border-b text-left">Birth Details</th>
            <th className="py-2 px-4 border-b text-left">Position Applied</th>
            <th className="py-2 px-4 border-b ">Action</th>
          </tr>
        </thead>
        <tbody>
          {usersWithBiodata.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.email || 'N/A'}</td>
              <td className="py-2 px-4 border-b">
                {user.biodata ? user.biodata.fullName : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                {user.biodata ? user.biodata.birthDetails : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b">
                {user.biodata ? user.biodata.positionApplied : 'N/A'}
              </td>
              <td className="py-2 px-4 border-b flex justify-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => onDetails(user.id)}
                >
                  Details
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(user.biodata!.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;

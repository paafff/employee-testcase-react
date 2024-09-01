import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserTable from '../components/UserTable';

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

const ListUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedInUser = localStorage.getItem('user');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser) as User;
      if (user.role === 'ADMIN') {
        setIsAdmin(true);
      }
    }

    const fetchUsers = async () => {
      try {
        const response = await fetch('http://localhost:3000/users');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleDetails = (userId: string) => {
    navigate(`/detail-user/${userId}`);
  };

  const handleDelete = async (biodataId: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/biodata/${biodataId}`,
        {
          method: 'DELETE',
        }
      );
      if (!response.ok) {
        throw new Error('Failed to delete biodata');
      }
      // Menghapus pengguna dari state setelah berhasil dihapus
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.biodata?.id !== biodataId)
      );
    } catch (error) {
      console.error('Error deleting biodata:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!isAdmin) {
    return <div>Halaman ini khusus untuk admin</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-4">User List</h1>
      <UserTable
        users={users}
        onDetails={handleDetails}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ListUsers;

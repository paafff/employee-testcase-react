import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import FormDetailsBiodata from '../components/FormDetailsBiodata';

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

const DetailUser: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:3000/users/${id}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!user) {
    return <div>No user found</div>;
  }

  return (
    <Layout>
      <h1>DetailUser Page</h1>
      <FormDetailsBiodata user={user} />
    </Layout>
  );
};

export default DetailUser;
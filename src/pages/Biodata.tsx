import React from 'react';
import Layout from '../components/Layout';
import FormInputBiodata from '../components/FormInputBiodata';
import { getUserData } from '../utils/auth';




const Biodata: React.FC = () => {
  const user = getUserData();

  return (
    <Layout>
      <h1>Biodata Page</h1>
      {user ? (
        <div>
          <p>Welcome, {user.email}!</p>
          {/* <p>Welcome, {user.id}!</p> */}
          <FormInputBiodata user={user} />
        </div>
      ) : (
        <p>Please log in to view your biodata.</p>
      )}
    </Layout>
  );
};

export default Biodata;

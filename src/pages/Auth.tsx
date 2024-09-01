import React, { useState } from 'react';
import LoginCard from '../components/LoginCard';
import Layout from '../components/Layout';
import RegisterCard from '../components/RegisterCard';

const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleAuthMode = () => {
    setIsLogin((prevIsLogin) => !prevIsLogin);
  };

  return (
    <Layout>
      <div className="flex justify-center items-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Auth Page</h1>
        <button
          onClick={toggleAuthMode}
          className="mb-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {isLogin ? 'Switch to Register' : 'Switch to Login'}
        </button>
      </div>
      {isLogin ? <LoginCard /> : <RegisterCard />}
    </Layout>
  );
};

export default Auth;

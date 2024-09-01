import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <header className="bg-blue-700 text-white p-4">
        <h1 className="text-2xl">My Application</h1>
      </header> */}
      <main className="flex-grow container mx-auto p-4">{children}</main>
      {/* <footer className="bg-blue-700 text-white p-4 text-center">
        &copy; 2023 My Application
      </footer> */}
    </div>
  );
};

export default Layout;

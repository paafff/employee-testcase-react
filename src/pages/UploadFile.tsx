import React from 'react';
import Layout from '../components/Layout';
import FileUpload from '../components/FileUpload';

const UploadFile: React.FC = () => {
  return (
    <Layout>
      {/* <div> */}
      <h1 className="text-2xl mx-auto">Bukti potong pajak pembelian barang</h1>
      <FileUpload />
      {/* </div> */}
    </Layout>
  );
};

export default UploadFile;

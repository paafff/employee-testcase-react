import React from 'react';
import Layout from '../components/Layout';
import AITextBox from '../components/AITextBox';

const AIChat: React.FC = () => {
  return (
    <Layout>
      <h1>AI Chat Page</h1>

      <AITextBox />
    </Layout>
  );
};

export default AIChat;

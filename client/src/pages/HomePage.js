import React from 'react';
import Layout from '../components/Layout/Layout';
import { useAuth } from '../context/auth';
import Teest from './Teest';

const HomePage = () => {
  const [authh, setAuthh] = useAuth();

 

  return (
    <Layout>
      <h1>HomePage</h1>
      <Teest />
      <pre>{JSON.stringify(authh, null, 4)}</pre>
    </Layout>
  );
};

export default HomePage;

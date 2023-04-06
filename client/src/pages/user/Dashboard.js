import React from 'react';
import Layout from '../../components/Layout/Layout';
import { useAuth } from '../../context/auth';
import UserMenu from '../../components/Layout/UserMenu';

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <Layout title='User-Dashboard'>
            <div className='cotainer-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h3>User name: {auth?.user?.username}</h3>
                            <h3>User email: {auth?.user?.email}</h3>
                            <h3>User contact no: {auth?.user?.phone}</h3>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import CategoryForm from '../../components/Form/CategoryForm';
import { Modal } from 'antd';

const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [name, setName] = useState('');
    const [visible, setVisible] = useState(false);

    //handleSubmit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/api/v1/category/create-category', { name });
            if (res.data?.success) {
                getCategory();
                toast.success(name + ` is created`);
            } else {
                toast.error(res.data.message);
            }
            setName('');
        }
        catch (error) {
            console.log(error);
            toast.error("something went wrong creating categories");
        }
    };
    const getCategory = async () => {
        try {
            const res = await axios.get('/api/v1/category/get-category');
            if (res.data?.success) {
                setCategory(res.data.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("something went wrong getting categories");
        }
    };
    useEffect(() => {
        getCategory();
        // eslint-disable-next-line
    }, []);
    return (
        <Layout title='Dashboard-Create Category'>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h1>Manage Category</h1>
                            <div className='p-3 w-75'>
                                <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                            </div>
                            <div className="w-75">
                                <table className="table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>{
                                        category?.map((c) => (
                                            <>
                                                <tr>
                                                    <td key={c._id}>{c.name}</td>
                                                    <td>
                                                        <button className="btn btn-primary ms-2" onClick={() => setVisible(true)}>Edite</button>
                                                        <button className="btn btn-danger ms-2" >Delete</button>
                                                    </td>
                                                </tr>
                                            </>
                                        ))
                                    }</tbody>
                                </table>

                            </div>
                            <Modal onCancel={() => setVisible(false)} footer={null} open={visible}></Modal>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default CreateCategory;

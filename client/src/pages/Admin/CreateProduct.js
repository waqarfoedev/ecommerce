import React, { useEffect, useState } from 'react';
import Layout from '../../components/Layout/Layout';
import AdminMenu from '../../components/Layout/AdminMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
const {Option} =Select

const CreateProduct = () => {
    const [categories, setCategories]=useState([])
    const [category, setCategory]=useState([])
    const [photo, setPhoto]=useState([])
    const [name, setName]=useState('')
    const [description, setDescription]=useState('')
    const [price, setPrice]=useState('')
    const [qantity, setQuantity]=useState('')
    const [shipping, setShipping]=useState('')

      // get all category
      const getCategory=async ()=>{
        try {
            const res= await axios.get('/api/v1/category/get-category')
            if(res.data?.success){
                setCategories(res.data.category)
            } 
        } catch (error) {
            console.log(error)
            toast.error('something went wrong during getting categories in CreateProduct')
        }
      }
      useEffect(()=>{
        getCategory()
        // eslint-disable-next-line
      },[])
    return (
        <Layout title='Dashboard-Create Product'>
            <div className='container-fluid m-3 p-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <div className='card w-75 p-3'>
                            <h1>Create Product</h1>
                        <div className='m-1 w-75'>
                            <Select 
                            bordered={false}
                             onChange={(value)=>{ setCategory(value)}}
                             placeholder='select a category'
                             size='large'
                             className='form-select mb-3'>
                            {categories?.map((c)=>(
                                <Option key={c._id} value={c.name}>
                                    {c.name}
                                </Option>
                            ))}
                            </Select>
                           <div className='mb-3'>
                           <label className='btn btn-outline-secondary col-md-12'>
                            {photo?photo.name:"Upload Photo"}
                                <input 
                                type='file' 
                                name='photo' 
                                accept='image/*' 
                                onChange={(e)=>setPhoto(e.target.files[0])}
                                hidden
                                />
                            </label>
                            <div className='mb-3'>
                                    {photo && (
                                        <div className='text-center'>
                                            <img src={URL.createObjectURL(photo)}
                                            alt='product_photo'
                                            height={'200px'}
                                            className='img img-responsive' />
                                        </div>
                                    )}
                            </div>
                            <div className='mb-3'>
                                <input className='form-control' type='text' placeholder='write a name' 
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                                />
                            </div>
                           </div>
                        </div>
                        </div>
                    </div>

                </div>

            </div>
        </Layout>
    );
};

export default CreateProduct;

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import "../../styles/AuthStyles.css";
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const navigate = useNavigate('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const valuee = { email, password };
        console.log(valuee);

        try {
            const res = await axios.post(`${process.env.REACT_APP_LOCALH}/api/v1/auth/login`, valuee);
            if (res.data.success) {
                navigate('/');
                toast.success("Login successfully");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Login"}>
            <div className='form-container' style={{ minHeight: "90vh" }}>
                <form onSubmit={onSubmit}>
                    <h4 className="title">LOGIN FORM</h4>

                    <div className="mb-3">
                        <input type="email"
                            className="form-control"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            className="form-control"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)} />
                    </div>


                    <button type="submit" required className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default Login;
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import "../../styles/AuthStyles.css";
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState();
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const valuee = { username, email, password, phone, address };
        console.log(valuee);

        try {
            const res = await axios.post(`/api/v1/auth/register`, valuee);
            if (res.data.success) {
                toast.success("Register successfully");
                navigate('/login');
            } else {
                toast.error("Something went wrong");
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Register"}>
            <div className='form-container' style={{ minHeight: "90vh" }}>
                <form onSubmit={onSubmit}>
                    <h4 className="title">REGISTER FORM</h4>
                    <div className="mb-3">
                        <input type="text"
                            required
                            autoFocus
                            className="form-control"
                            placeholder='Enter your name'
                            value={username}
                            onChange={(e) =>
                                setUsername(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <input type="email"
                            required className="form-control"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            required className="form-control"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            required className="form-control"
                            placeholder='Enter your contact no'
                            value={phone}
                            onChange={(e) =>
                                setPhone(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            required className="form-control"
                            placeholder='Enter your address'
                            value={address}
                            onChange={(e) =>
                                setAddress(e.target.value)} />
                    </div>
                    <button type="submit" required className="btn btn-primary">Submit</button>
                </form>
            </div>
        </Layout>
    );
};

export default Register;

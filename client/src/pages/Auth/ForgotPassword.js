import React, { useState } from 'react';
import toast from 'react-hot-toast';
import Layout from '../../components/Layout/Layout';
import axios from 'axios';
import "../../styles/AuthStyles.css";
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {

    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState();
    const [answer, setAnswer] = useState();
    const navigate = useNavigate('');

    const onSubmit = async (e) => {
        e.preventDefault();
        const valuee = { email, newPassword, answer };
        console.log(valuee);

        try {
            const res = await axios.post(`/api/v1/auth/forget-password`, valuee);
            if (res && res.data.success) {
                navigate('/login');
                toast.success(res.data && res.data.message);

            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <Layout title={"Reset Password"}>
            <div className='form-container' style={{ minHeight: "90vh" }}>
                <form onSubmit={onSubmit}>
                    <h4 className="title">Reset Password</h4>

                    <div className="mb-3">
                        <input type="email"
                            className="form-control"
                            placeholder='Enter your email'
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="text"
                            className="form-control"
                            placeholder='Enter your favorite city'
                            value={answer}
                            onChange={(e) =>
                                setAnswer(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <input type="password"
                            className="form-control"
                            placeholder='Enter your new password'
                            value={newPassword}
                            onChange={(e) =>
                                setNewPassword(e.target.value)} />
                    </div>

                    <button type="submit" required className="btn btn-primary">Reset Password</button>
                </form>
            </div>
        </Layout>
    );
};

export default ForgotPassword;

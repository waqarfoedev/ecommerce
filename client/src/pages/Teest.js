import { Modal } from 'antd';
import React, { useState } from 'react';
import CategoryForm from '../components/Form/CategoryForm';

const Teest = () => {
    const [a, aa] = useState(false);
    const [test, setTest] = useState('');
    const [vv, setVvv] = useState('Deffaul');
    const handleSubmit = (e) => {
        e.preventDefault();
        setVvv(test);
        aa(false);
    };
    return (
        <div>
            <button className="btn btn-primary ms-2" onClick={() => aa(true)}>just click</button>
            <Modal onCancel={() => aa(false)} open={a} footer={null}>
                <CategoryForm handleSubmit={handleSubmit} value={test} setValue={setTest} />
            </Modal>
            <h2>{vv}</h2>
        </div>
    );
};

export default Teest;

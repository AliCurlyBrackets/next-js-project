import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import './Modal.css';

export default function AntModal({ children = '' }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        setTimeout(() => {
            setIsModalOpen(true);
        }, 20000);
    }, []);

    return (
        <Modal
            centered
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
            footer={null}
        >
            {children}
        </Modal>
    );
};
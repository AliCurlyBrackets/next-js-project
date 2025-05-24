'use client'
import React, { useState } from 'react'
import { Rate as AntRate } from 'antd';
import sweetAlert from '@/helpers/sweetAlert';
import { CustomCreateRate } from '@/services/generalServices';
import { useRouter } from 'next/navigation';

export default function Rate({ name = '', id = '' }) {
    const router = useRouter();
    const [rate, setRate] = useState(0);
    const [disabled, setDisabled] = useState(false);

    const handleChange = async (value) => {
        setRate(value);

        try {
            await CustomCreateRate(id, name, value);
            sweetAlert.success('تم التقييم بنجاح');
            setDisabled(true);
            router.refresh();
        } catch (error) {
            sweetAlert.error(error?.response?.data?.message || 'حدث خطأ ما');
        }
    }

    return (
        <AntRate
            disabled={disabled}
            value={rate}
            allowHalf={false}
            direction='rtl'
            onChange={handleChange}
        />
    )
}

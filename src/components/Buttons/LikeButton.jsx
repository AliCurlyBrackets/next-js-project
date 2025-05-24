'use client'

import React, { useState } from 'react'
import { CustomEditLike } from '@/services/generalServices';
import { useRouter } from 'next/navigation';
import NormalButton from './NormalButton'
import LikeIcon from '@/assets/images/icons/like.svg'
import LikeIconActive from '@/assets/images/icons/like-active.svg'
import sweetAlert from '@/helpers/sweetAlert';
import './Button.css'

export default function LikeButton({ id, name, path }) {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);

    const handleClick = async () => {
        if (path) return window.open(path, '_blank');
        if (toggle) return;

        try {
            await CustomEditLike(id, name);
            setToggle(true);
            sweetAlert.success('تم الإعجاب بنجاح');
            router.refresh();
        } catch (error) {
            sweetAlert.error(error?.response?.data?.message || 'حدث خطأ ما');
        }
    }

    return (
        <NormalButton className={`like-btn ${toggle ? 'active' : ''}`} text='أعجبني' iconRight={toggle ? LikeIconActive : LikeIcon} onClick={handleClick} />
    )
}

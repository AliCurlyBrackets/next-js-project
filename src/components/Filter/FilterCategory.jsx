'use client';

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Dropdown from '../Dropdown/Dropdown';
import CategoryIcon from '@/assets/images/icons/category.svg'
import './Filter.css'

export default function FilterCategory({ className = '', items = [] }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updatedSearchParams = new URLSearchParams(searchParams);

    const handleChange = (category) => {
        updatedSearchParams.set('category', category);
        updatedSearchParams.set('page', '1');
        router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false });
    }

    const handledItems = items?.map((item, index) => {
        return {
            key: item?.id || index,
            label: <div onClick={() => handleChange(item?.id)}>{item?.name || ""}</div>,
        }
    });

    const defaultItem = {
        key: '0',
        label: <div onClick={() => handleChange('')}>الكل</div>,
    };

    return (
        <Dropdown className={`category-dropdown ${className}`} icon={CategoryIcon} text="التصنيف" items={[defaultItem, ...handledItems]} />
    )
}

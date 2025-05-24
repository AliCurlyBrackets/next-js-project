'use client';

import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import Dropdown from '../Dropdown/Dropdown';
import Image from 'next/image';
import Sorting from '@/assets/images/icons/sorting.svg'
import SortingUp from '@/assets/images/icons/sort-up.svg'
import SortingDown from '@/assets/images/icons/sort-down.svg'
import NormalButton from '../Buttons/NormalButton';
import './Filter.css'
import { Flex } from 'antd';

export default function Filter({ className = '' }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updatedSearchParams = new URLSearchParams(searchParams);

    const handleChange = (sort) => {
        updatedSearchParams.set('page', '1');
        updatedSearchParams.set('sort', sort);
        router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false, shallow: true });
        router.refresh();
    }

    const items = [
        {
            key: '0',
            label: <p onClick={() => handleChange('desc')}>الأحدث</p>,
            icon: <Image src={SortingUp} alt="sorting" onClick={() => handleChange('desc')} />,
        },
        {
            key: '1',
            label: <p onClick={() => handleChange('asc')}>الأقدم</p>,
            icon: <Image src={SortingDown} alt="sorting" onClick={() => handleChange('asc')} />,
        },
    ];



    return (
        <Dropdown className={className} icon={Sorting} text="ترتيب حسب" items={items} />
    )
}

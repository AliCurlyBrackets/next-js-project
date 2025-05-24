'use client';
import React from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Pagination as AntPagination } from 'antd';
import './Pagination.css'

export default function Pagination({ page = 1, perPage = 16, total = 0 }) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const updatedSearchParams = new URLSearchParams(searchParams);

    const handleChange = (page) => {
        updatedSearchParams.set('page', page);
        router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false });
    }

    return (
        <AntPagination showSizeChanger={false} total={total} current={page} pageSize={perPage} onChange={handleChange} />
    )
}

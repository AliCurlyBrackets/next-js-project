'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import NormalButton from './NormalButton'
import CommentIcon from '@/assets/images/icons/comment.svg'
import './Button.css'

export default function CommentButton({ path }) {
    const pathname = usePathname();
    console.log(pathname)
    return (
        <NormalButton className='comment-btn' text='تعليق' iconRight={CommentIcon} onClick={() => {
            if (path) return window.open(path, '_blank');
            if (pathname.includes('podcasts')) return window.scrollTo(0, 1300)
            window.scrollTo(0, 500)
        }} />
    )
}

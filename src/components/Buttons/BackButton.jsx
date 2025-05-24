'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { Button } from 'antd'
import Image from 'next/image'
import Back from "@/assets/images/icons/back-arrow.svg"
import './Button.css'

export default function BackButton({ text = '' }) {
    const router = useRouter();

    return (
        <Button className='back-btn' onClick={() => router.back()}>
            <Image src={Back} alt="back" width={20} height={20} />
            <p>{text}</p>
        </Button>
    )
}

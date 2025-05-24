'use client'

import React, { useEffect, useState } from 'react'
import { Flex } from 'antd'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import facebook from '@/assets/images/icons/facebook-bg-gray.svg'
import x from '@/assets/images/icons/x.svg'
import whatsapp from '@/assets/images/icons/whatsapp.svg'
import './Share.css'

export default function Share() {
    const pathname = usePathname()
    const [shareUrl, setShareUrl] = useState('')

    useEffect(() => {
        if (process) setShareUrl(`${window.location.href}`)
    }, [pathname])

    return (
        <div className='share-card'>
            <p>شارك مع أصدقاءك</p>
            <Flex wrap className={`social-share`} align='center' gap="middle">
                <a target="_blank" href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}><Image src={facebook} alt="facebook" /></a>
                <a target="_blank" href={`https://x.com/share?url=${shareUrl}`}><Image src={x} alt="x" /></a>
                <a target="_blank" href={`https://api.whatsapp.com/send?text=${shareUrl}`}><Image src={whatsapp} alt="whatsapp" /></a>
            </Flex>
        </div>
    )
}
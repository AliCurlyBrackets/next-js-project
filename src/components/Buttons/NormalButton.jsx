'use client'

import React from 'react'
import { Button, Flex } from 'antd'
import { usePathname } from 'next/navigation';
import Image from 'next/image'
import './Button.css'

export default function NormalButton({ text = "", className = "", icon = "", iconRight = '', disabled = false, path = "no-path", onClick = () => { } }) {
    const pathname = usePathname();
    const pathnameWithoutLang = pathname.split('/')?.[1] || '';
    const isActive = `/${pathnameWithoutLang}` == path;

    return (
        <Button
            type="text"
            className={`${className} ${isActive ? 'active' : ''} ${text ? '' : 'no-text'}`}
            onClick={onClick}
            disabled={disabled}
        >
            {iconRight && (<Flex align='center' gap="small"><Image src={iconRight} alt="icon" /> {text}</Flex>)}
            {(!iconRight && text) && text}
            {icon && <Image src={icon} alt="icon" />}
        </Button>
    )
}

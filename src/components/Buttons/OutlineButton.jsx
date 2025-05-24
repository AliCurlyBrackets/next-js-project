'use client';

import React from 'react'
import Image from 'next/image'
import Link from 'next/link';
import { Button } from 'antd'
import { Flex } from 'antd';
import './Button.css'

export default function MainButton({ text = "", className = "", icon = "", iconRight = '', path = '', disabled = false, onClick = () => { } }) {
    return (
        <Link href={path} target={path.includes('http') ? '_blank' : ''}>
            <Button
                disabled={disabled}
                className={`main-btn ${className}`}
                onClick={onClick}
            >
                {iconRight && (<Flex align='center' gap="small"><Image src={iconRight} alt="icon" /> {text}</Flex>)}
                {(!iconRight && text) && text}
                {icon && <Image src={icon} alt="icon" />}
            </Button>
        </Link>
    )
}

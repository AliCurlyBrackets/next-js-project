'use client';

import React from 'react'
import { Button } from 'antd'
import { Flex } from 'antd';
import Image from 'next/image'
import './Button.css'

export default function SecondButton({ text = "", className = "", icon = "", iconRight = '', path = "no-path", onClick = () => { } }) {

    return (
        <Button
            type="primary"
            className={`${className} second-btn`}
            onClick={onClick}
        >
            {iconRight && (<Flex align='center' gap="small"><Image src={iconRight} alt="icon" /> {text}</Flex>)}
            {(!iconRight && text) && text}
            {icon && <Image src={icon} alt="icon" />}
        </Button>
    )
}

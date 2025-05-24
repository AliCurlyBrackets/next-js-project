'use client'

import React from 'react'
import { Flex } from 'antd';
import Ar from '@/assets/images/icons/ar.svg';
import En from '@/assets/images/icons/en.svg';
import Image from 'next/image';
import './Language.css';

export default function Language() {

    return (
        <ul className='language'>
                <li>
                    <a href={`/`}>
                        <Flex wrap className="lang" align='center' gap="small">
                            <Image src={En} alt="English" width={20} height={20} />
                            EN
                        </Flex>
                    </a>
                </li>

                <li>
                    <a href={`/`}>
                        <Flex wrap className="lang" align='center' gap="small">
                            <Image src={Ar} alt="العربية" width={20} height={20} />
                            AR
                        </Flex>
                    </a>
                </li>
        </ul>
    )
}
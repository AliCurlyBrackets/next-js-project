'use client'

import React from 'react'
import { Flex } from 'antd'
import Container from '../Container/Container'
import Quote from '../Quote/Quote'
import NormalButton from '../Buttons/NormalButton'
import YoutubeButton from '../Buttons/YoutubeButton'
import './Breadcrumb.css'

export default function Breadcrumb({ className = '', img = '', bgColor = '', title = '', desc = '', buttonText = '', buttonIcon = '', buttonClass = '', buttonPath = '' }) {
    return (
        <Flex className={`bread-heros ${className}`} style={{ backgroundColor: bgColor }}>
            <Container>
                <Quote className='p-0' img={img} bgColor={bgColor}>
                    <h2>{title}</h2>
                    <div className='quote-desc' dangerouslySetInnerHTML={{ __html: desc }} />
                    {(buttonText && buttonIcon && buttonPath) && (
                        <NormalButton
                            className={buttonClass}
                            text={buttonText}
                            icon={buttonIcon}
                            onClick={() => window.open(buttonPath, '_blank')}
                        />
                    )}
                    {/* <YoutubeButton /> */}
                </Quote>
            </Container>
        </Flex>
    )
}

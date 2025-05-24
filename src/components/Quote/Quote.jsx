import React from 'react'
import { Col, Row } from 'antd'
import Image from 'next/image'
import './Quote.css'

export default function Quote({ img = '', imgL = '', imgR = '', bgColor = '', raduis = '', className = '', children }) {
    return (
        <Row className={`quote-card w-100 m-0 ${className}`} style={{ backgroundColor: bgColor, borderRadius: raduis }} align={'middle'} gutter={[16, 16]}>
            {
                img ?
                    (
                        <>
                            <Col xs={24} lg={12}>
                                {children}
                            </Col>
                            <Col xs={24} lg={12}>
                                <Image src={img} alt='quote' className='quote-img' />
                            </Col>
                        </>
                    )
                    : (imgL && imgR) ?
                        (
                            <>
                                <Col xs={24} lg={6}>
                                    <Image src={imgL} alt='quote' className='quote-img-left' />
                                </Col>
                                <Col xs={24} lg={12}>
                                    {children}
                                </Col>
                                <Col xs={24} lg={6}>
                                    <Image src={imgR} alt='quote' className='quote-img-right' />
                                </Col>
                            </>
                        )
                        : (imgR) ?
                            (
                                <>
                                    <Col xs={24} lg={18}>
                                        {children}
                                    </Col>
                                    <Col xs={24} lg={6}>
                                        <Image src={imgR} alt='quote' className='quote-img-right' />
                                    </Col>
                                </>
                            )
                            : (imgL) ?
                                (
                                    <>
                                        <Col xs={24} lg={6}>
                                            <Image src={imgL} alt='quote' className='quote-img-left' />
                                        </Col>
                                        <Col xs={24} lg={18}>
                                            {children}
                                        </Col>
                                    </>
                                )
                                :
                                (
                                    <Col xs={24}>
                                        {children}
                                    </Col>
                                )
            }
        </Row>
    )
}
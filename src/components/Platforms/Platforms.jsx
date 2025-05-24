import React from 'react'
import Container from '../Container/Container'
import { Col, Row } from 'antd'
import Slider from '../Slider/Slider'
import './Platforms.css'

export default function Platforms({ platformsList = [] }) {
    return (
        <div className='platforms-section'>
            <Container>
                <div className="content">
                    <h2 className='text-center'>استمع إلى البودكاست على</h2>
                </div>
            </Container>
            <Container>
                {/* <Slider items={platformsList} className='platforms-slider' centeredSlides={true} slidesPerView={3} slidesPerViewMd={3} slidesPerViewSm={2} spaceBetween={10} /> */}
                <Row gutter={[24, 24]} align={'middle'} justify={'center'}>
                    {platformsList?.map((platform, index) => (
                        <Col key={index} xs={24} lg={8} className='platform-item'>
                            {platform}
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    )
}

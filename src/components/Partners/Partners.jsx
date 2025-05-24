import React from 'react'
import Container from '../Container/Container'
import Slider from '../Slider/Slider'

export default function Partners({ partnersList = [] }) {
    return (
        <>
            <Container>
                <div className="content">
                    <h2 className='text-center'>شركاؤنا</h2>
                </div>
            </Container>
            <Container>
                <Slider items={partnersList} className='partners-slider' centeredSlides={true} slidesPerView={5} slidesPerViewMd={3} slidesPerViewSm={2} spaceBetween={10} />
            </Container>
        </>
    )
}

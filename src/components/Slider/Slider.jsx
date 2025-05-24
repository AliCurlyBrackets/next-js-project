'use client'

import React, { useEffect, useState } from 'react'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function Slider({ items = [], className = "", centeredSlides = false, slidesPerView = 3, slidesPerViewMd = 2, slidesPerViewSm = 1, spaceBetween = 0, customArrow = false }) {
    const [mobileView, setMobileView] = useState(false)

    useEffect(() => {
        if (!window) return
        const handleResize = () => {
            setMobileView(window.innerWidth < 992)
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <Swiper
            className={className}
            modules={[Autoplay, Navigation]}
            navigation={customArrow ? { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' } : false}
            spaceBetween={spaceBetween}
            slidesPerView={mobileView ? slidesPerViewSm : slidesPerView}
            breakpoints={{
                576: {
                    slidesPerView: slidesPerViewSm,
                    spaceBetween: spaceBetween,
                },
                768: {
                    slidesPerView: slidesPerViewMd,
                    spaceBetween: spaceBetween,
                },
                992: {
                    slidesPerView: slidesPerView,
                    spaceBetween: spaceBetween,
                },
            }}
            autoplay
            loop={true}
            centeredSlides={mobileView ? false : centeredSlides}
        >
            {items?.map((item, index) => (
                <SwiperSlide key={item?.id || index}>
                    {item}
                </SwiperSlide>
            ))}
        </Swiper>
    )
}
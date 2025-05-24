'use client'
import React, { useEffect, useState } from 'react'
import HeroBG from '@/assets/images/hero-bg.svg';
import MobileHeroBG from '@/assets/images/hero-bg-mobile.svg';
import Container from '@/components/Container/Container'
import Image from 'next/image'

export default function HeroSection() {
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
        <section className='hero-section' data-aos="fade-up">
            {mobileView ? <Image src={MobileHeroBG} alt='Hero Background' /> : <Image src={HeroBG} alt='Hero Background' />}
            <Container>
                <div className='content'>
                    <h1>
                        نحن نعيد إحياء العصر الذهبي
                        <br />
                        لأجل السلام والازدهار
                    </h1>
                    <h4>
                        بيت الحكمة 2.0 هو منصة عربية لنشر الفكر الحر والتفكير النقدي
                    </h4>
                    <p>
                        نحن نعيد إحياء العصر الذهبي الآن...وأنت جزء من ذلك. 
                    </p>
                </div>
            </Container>
        </section>
    )
}

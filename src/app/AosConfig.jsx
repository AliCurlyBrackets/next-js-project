'use client'
import { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'

export default function AosConfig() {
    useEffect(() => { Aos.init({ easing: "ease-out-cubic", once: true, offset: 200, duration: 500, disable: 'mobile' }) }, [])
    return null
}
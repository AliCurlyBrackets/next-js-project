import React from 'react'
import Container from '@/components/Container/Container'
import ContactUs from '@/components/ContactUs/ContactUs'
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb'
import ContactHero from '@/assets/images/contact-hero.png'
import './page.css'

export default function page() {
  return (
    <section className='contact-section'>
      <title>تواصل معنا - بيت الحكمة</title>
      {/* <meta name="description" content="تواصل معنا - بيت الحكمة" /> */}

      <Breadcrumb className='contact-hero' img={ContactHero} bgColor="#F19298" title='تواصل معنا' />
      <ContactUs />
    </section>
  )
}

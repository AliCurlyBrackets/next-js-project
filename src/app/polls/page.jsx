import React from 'react'
import PollsHero from '@/assets/images/polls-hero.png';
import Container from '@/components/Container/Container';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Survey from '@/components/Survey/Survey';
import './page.css'

export default function page() {
    return (
        <div className='polls-page'>
            <title>الاستبيانات - بيت الحكمة</title>
            {/* <meta name="description" content="الاستبيانات - بيت الحكمة" /> */}

            <Breadcrumb className='polls-hero' img={PollsHero} bgColor="#C7CAEA" title='استبيانات' desc='نص تجريبي لوصف صفحة الاستبيانا' />

            <Container>
                <Survey polls={[]} />
            </Container>
        </div>
    )
}

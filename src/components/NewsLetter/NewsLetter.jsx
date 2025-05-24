'use client'

import React, { useState } from 'react'
import { createNewsletter } from '@/services/generalServices';
import NewsletterL from '@/assets/images/icons/newsletter-l.svg';
import NewsletterR from '@/assets/images/icons/newsletter-r.svg';
import NewsletterIcon from '@/assets/images/icons/newsletter-icon.svg';
import Text from '@/components/Inputs/Text';
import NormalButton from '@/components/Buttons/NormalButton';
import Quote from '@/components/Quote/Quote';
import Image from 'next/image';
import sweetAlert from '@/helpers/sweetAlert';

export default function NewsLetter() {
    const [email, setEmail] = useState('');

    const handleSubmit = async () => {
        if (!email) {
            sweetAlert.error('الرجاء إدخال بريدك الإلكتروني')
            return;
        }
        try {
            const { data } = await createNewsletter({ email });
            sweetAlert.success('تم الاشتراك بنجاح')
            setEmail('');
        } catch (error) {
            console.log(error)
            sweetAlert.error(error.response.data.message || 'حدث خطأ ما')
        }
    }

    return (
        <Quote imgL={NewsletterL} imgR={NewsletterR} bgColor={'#202857'}>
            <div className='quote-content'>
                <Image src={NewsletterIcon} alt='Newsletter Icon' />
                <h2>اشترك في نشرتنا البريدية الآن واستمتع بالوصول المبكر إلى محتوانا المميز</h2>
                <div className="input-button-custom">
                    <Text placeholder='أدخل بريدك الإلكتروني' name='email' state={email} setState={setEmail} />
                    <NormalButton text='اشترك الآن' onClick={handleSubmit} />
                </div>
            </div>
        </Quote>
    )
}

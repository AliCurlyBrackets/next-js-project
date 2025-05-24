'use client'

import MainButton from '@/components/Buttons/MainButton'

export default function NotFound() {
    const goHome = () => { window.location.href = '/' };

    return (
        <div className='error-page'>
            <title>الصفحة غير موجودة</title>
            <div className='content text-center'>
                <h2 className='text-center'>
                    الصفحة غير موجودة
                </h2>
                <MainButton onClick={goHome} text='العودة للصفحة الرئيسية' />
            </div>
        </div>
    )
}
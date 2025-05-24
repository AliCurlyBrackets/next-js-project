'use client'

import MainButton from '@/components/Buttons/MainButton'

export default function Error({ error, reset }) {
    console.log('Error:', error)
    const goHome = () => { window.location.href = '/' };

    return (
        <div className='error-page'>
            <title>حدث خطأ ما</title>
            <div className='content text-center'>
                <h2 className='text-center'>
                    حدث خطأ ما أثناء تحميل الصفحة!
                    <br />
                    يرجى المحاولة مرة أخرى
                </h2>
                <MainButton onClick={goHome} text='العودة للصفحة الرئيسية' />
            </div>
        </div>
    )
}
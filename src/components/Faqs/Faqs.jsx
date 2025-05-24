import React from 'react'
import Toggler from '../Toggler/Toggler'
import Container from '../Container/Container'
import MainButton from '../Buttons/MainButton'
import OutlineButton from '../Buttons/OutlineButton'

export default function Faqs({ faqList = [] }) {
    return (
        <>
            <Container>
                <div className="content">
                    <h2 className='text-center'>الأسئلة المتكررة</h2>
                </div>
            </Container>
            <Container>
                <Toggler items={faqList} />
                <div className="ant-collapse another-questions">
                    <div className="ant-collapse-item">
                        <div className="ant-collapse-header">
                            <span className="ant-collapse-header-text">لديك المزيد من الاسئلة؟</span>
                            <div className="buttons">
                                <MainButton path='contact-us' className='border-main bg-main text-white' text='تواصل معنا' />
                                <OutlineButton path='join-us' className='border-main text-main' text='انضم لنا' />
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </>
    )
}

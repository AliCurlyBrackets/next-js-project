'use client'
import React, { useEffect, useState } from 'react'
import { Flex, Row, Col, Divider } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import { getPolls } from '@/services/generalServices';
import Link from 'next/link'
import logo from '@/assets/images/icons/footer-logo.svg'
import Image from 'next/image';
import Container from '../Container/Container';
import NormalButton from '../Buttons/NormalButton';
import SocialIcons from '../SocialIcons/SocialIcons.jsx';
import Modal from '../Modal/Modal';
import Survey from '../Survey/Survey';
import './Footer.css'

export default function Footer() {
    const router = useRouter();
    const pathname = usePathname();
    const [polls, setPolls] = useState([])

    const getPollsHandler = async () => {
        try {
            const { data } = await getPolls();
            setPolls(data?.filter(poll => poll.popup && poll.active));
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getPollsHandler();
    }, []);

    return (
        <Flex wrap className='footer' vertical>
            <Container>
                <Row gutter={[24, 24]}>

                    <Col xs={24} lg={6} className='footer-info'>
                        <Flex vertical align='start' gap="middle">
                            <Link className='logo' href='/'>
                                <Image src={logo} alt='logo' width={100} height={100} />
                            </Link>
                            <p>نحن نعيد إحياء العصر الذهبي الآن...وأنت جزء من ذلك.</p>
                        </Flex>
                    </Col>

                    <Col xs={24} lg={12}>
                        <Row gutter={[24, 24]}>
                            <Col xs={24} lg={8}>
                                <Flex vertical align='start'>
                                    <p>خريطة الموقع</p>
                                    <NormalButton text='الرئيسية' onClick={() => { router.push(`/`) }} />
                                    <NormalButton text='مقالات الويكيبيديا' onClick={() => { router.push(`/wiki-articles?page=1&perPage=16&sort=desc&column=published_at&search=&category=`) }} />
                                    {/* <NormalButton text='المبادرات' onClick={() => { router.push(`/challenges`) }} /> */}
                                    <NormalButton text='عن المشروع' onClick={() => { router.push(`/about-project`) }} />
                                </Flex>
                            </Col>
                            <Col xs={24} lg={8}>
                                <Flex vertical align='start'>
                                    <p>اكتشف</p>
                                    <NormalButton text='المدونة' onClick={() => { router.push(`/articles?page=1&perPage=8&sort=desc&column=published_at&search=&category=`) }} />
                                    <NormalButton text='فيديوهات' onClick={() => { router.push(`/videos?page=1&perPage=16&sort=desc&column=published_at&search=&category=`) }} />
                                    <NormalButton text='كتب' onClick={() => { router.push(`/books?page=1&perPage=16&sort=desc&column=published_at&search=&category=`) }} />
                                    <NormalButton text='بودكاست' onClick={() => { router.push(`/podcasts?page=1&perPage=8&sort=desc&column=published_at&search=`) }} />
                                </Flex>
                            </Col>
                            <Col xs={24} lg={8}>
                                <Flex vertical align='start'>
                                    <p>المزيد</p>
                                    <NormalButton text='انضم الينا' onClick={() => { router.push(`/join-us`) }} />
                                    <NormalButton text='تواصل معنا' onClick={() => { router.push(`/contact-us`) }} />
                                </Flex>
                            </Col>
                        </Row>
                    </Col>

                    <Col xs={24} lg={6} className='footer-social'>
                        <Flex vertical align='start'>
                            <h4>تابعنا على مواقع التواصل الاجتماعي</h4>
                            <SocialIcons />
                        </Flex>
                    </Col>

                </Row>
            </Container>

            <Divider />

            <Container>
                <Flex wrap justify='space-between' align='center' className='footer-rights'>
                    <p>
                        All rights reserved The House of Wisdom 2.0 © One of <a href='https://ideasbeyondborders.org' target='_blank' rel='noreferrer'>Ideas Beyond Borders</a> programs
                    </p>
                    <p>
                        Developed by <a href='https://www.apollo-solutions.net' target='_blank' rel='noreferrer'>Apollo Solutions</a>
                    </p>
                </Flex>
            </Container>

            {polls?.length > 0 && (
                <Modal>
                    <Survey polls={polls} />
                </Modal>
            )}
        </Flex>
    )
}

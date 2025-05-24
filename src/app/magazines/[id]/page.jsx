import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getMagazine } from '@/services/generalServices';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import BookWhite from '@/assets/images/icons/book-white.svg'
import Container from '@/components/Container/Container';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import Quote from '@/components/Quote/Quote';
import BooksQuote from '@/assets/images/icons/books-quote.png';
import Comments from '@/components/Comments/Comments';
import Survey from '@/components/Survey/Survey';
import BackButton from '@/components/Buttons/BackButton';
import Rate from '@/components/Rate/Rate';
import OutlineButton from '@/components/Buttons/OutlineButton';
import MainButton from '@/components/Buttons/MainButton';
import Download from '@/assets/images/icons/download.svg';
import Edit from '@/assets/images/icons/edit.svg';
import Share from '@/components/Share/Share';
import Like from '@/assets/images/icons/like.svg';
import Comment from '@/assets/images/icons/comment.svg';
import LikeButton from '@/components/Buttons/LikeButton';
import CommentButton from '@/components/Buttons/CommentButton';
import EndPoint from '@/services/EndPoint';
import './page.css'

export default async function page({ params: { id } }) {
    const { ImgEndPoint } = EndPoint;
    const { data: magazineData } = await getMagazine(id);
    const url = magazineData?.pdf ? `${ImgEndPoint}${magazineData?.pdf}` : '';
    const relatedItemsData = magazineData?.related_magazines;
    const pollsData = magazineData?.polls?.filter(poll => poll?.active);
    const comments = magazineData?.comments;

    const relatedItemsList = relatedItemsData?.map((item, index) => {
        return (
            <Vertical className='heighter' key={item?.id || index} id={item?.id} path='magazines' img={`${ImgEndPoint}${item?.thumbnails || ""}`} hoverImageText='قراءة المجلة' hoverImage={BookWhite} title={item?.title} />
        )
    })

    return (
        <div className='book-page'>
            <title>{magazineData?.title || ""}</title>
            <meta name="description" content={magazineData?.title || ""} />

            <div className='bg-gray'>
                <Container>
                    <div className="book-info">
                        <Row gutter={[24, 24]} >
                            <Col xs={24} lg={6} className='book-image'>
                                <Image src={`${ImgEndPoint}${magazineData?.thumbnails || ""}`} alt={magazineData?.title || "title"} width='500' height='500' />
                            </Col>

                            <Col xs={24} lg={18} className='book-details'>
                                <BackButton text='العودة للخلف' />
                                <h2>
                                    {magazineData?.title}
                                </h2>

                                <Flex gap='middle' align='center' className='book-rate'>
                                    <Rate name='magazines' id={magazineData?.id} />
                                    <p className='m-0'>{magazineData?.average_rating || ''} • {magazineData?.rating_count || ''}</p>
                                </Flex>

                                <Flex gap='small' align='center' className='book-rate'>
                                    <Image src={Like} alt='like' />
                                    <p className='m-0'>{magazineData?.likes_count || '0'}</p>

                                    <Image src={Comment} alt='comment' />
                                    <p className='m-0'>{magazineData?.comments?.filter(comment => comment?.approved).length || '0'}</p>
                                </Flex>

                                <Flex wrap typeof='inline' gap='small' align='center' className='book-actions'>
                                    <MainButton path={`/magazines/${magazineData?.id}/read`} text='قراءة المجلة' icon={BookWhite} />
                                    <OutlineButton text='تحميل المجلة' icon={Download} path={url} />
                                </Flex>

                                <Flex wrap gap='middle' align='center' justify='space-between' className='book-bottom-actions'>
                                    <Flex wrap gap='middle' align='center'>
                                        <LikeButton name='magazines' id={magazineData?.id} />
                                        <CommentButton />
                                    </Flex>

                                    <Share />
                                </Flex>

                            </Col>
                        </Row>
                    </div>
                </Container>

                <Container>
                    <Row align='middle' gutter={[30, 30]}>
                        <Col xs={24} lg={14}>
                            <Comments comments={comments} id={id} name='magazines' />
                        </Col>
                        <Col xs={24} lg={10}>
                            {pollsData?.length ? <Survey polls={pollsData} /> : <h2 className='no-result'>لا يوجد استبيانات</h2>}
                        </Col>
                    </Row>
                </Container>

            </div>

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>اقرأ أيضاً</h2></div>
                    <Flex wrap align='center' gap={'middle'}>
                        <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                        <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                    </Flex>
                </Flex>
            </Container>

            <Container>
                {relatedItemsList?.length ? <Slider items={relatedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا يوجد مجلات مشابهة</h2>}
            </Container>

            <Container>
                <Row gutter={[24, 24]} align={'middle'} justify={'center'} >
                    <Col xs={24} lg={24}>
                        <Quote className='book-quote' img={BooksQuote} bgColor={'#202956'} raduis={12}>
                            <div className='quote-content'>
                                <h2>“إذا كنت تقرأ الكتب التي يقرأها الآخرون فقط، سَتُفَكَّر فيما يُفَكَّر فيه الآخرون فحسب”</h2>
                                <p>هاروكي موراكامي</p>
                            </div>
                        </Quote>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

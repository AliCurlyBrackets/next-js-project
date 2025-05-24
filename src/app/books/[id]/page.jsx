import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getBook } from '@/services/generalServices';
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
    const { data: bookData } = await getBook(id);
    const url = bookData?.pdf ? `${ImgEndPoint}${bookData?.pdf}` : '';
    const relatedItemsData = bookData?.related_books;
    const pollsData = bookData?.polls?.filter(poll => poll?.active);
    const comments = bookData?.comments;

    const relatedItemsList = relatedItemsData?.map((item, index) => {
        return (
            <Vertical className='heighter' key={item?.id || index} id={item?.id} path='books' img={`${ImgEndPoint}${item?.thumbnails || ""}`} hoverImageText='قراءة الكتاب' hoverImage={BookWhite} title={item?.title} desc={item?.author} />
        )
    })

    return (
        <div className='book-page'>
            <title>{bookData?.title || ""}</title>
            <meta name="description" content={bookData?.excerpt || ""} />

            <div className='bg-gray'>
                <Container>
                    <div className="book-info">
                        <Row gutter={[24, 24]} >
                            <Col xs={24} lg={6} className='book-image'>
                                <Image src={`${ImgEndPoint}${bookData?.thumbnails || ""}`} alt={bookData?.title || "title"} width='500' height='500' />
                            </Col>

                            <Col xs={24} lg={18} className='book-details'>
                                <BackButton text='العودة للخلف' />
                                <h2>
                                    {bookData?.title}
                                </h2>
                                <p>
                                    {bookData?.author || ''}
                                    <br />
                                    {bookData?.category?.name || ''}
                                </p>

                                <Flex gap='middle' align='center' className='book-rate'>
                                    <Rate name='books' id={bookData?.id} />
                                    <p className='m-0'>{bookData?.average_rating || ''} • {bookData?.rating_count || ''}</p>
                                </Flex>

                                <Flex gap='small' align='center' className='book-rate'>
                                    <Image src={Like} alt='like' />
                                    <p className='m-0'>{bookData?.likes_count || '0'}</p>

                                    <Image src={Comment} alt='comment' />
                                    <p className='m-0'>{bookData?.comments?.filter(comment => comment?.approved).length || '0'}</p>
                                </Flex>

                                <Flex wrap typeof='inline' gap='small' align='center' className='book-actions'>
                                    <MainButton path={`/books/${bookData?.id}/read`} text='قراءة الكتاب' icon={BookWhite} />
                                    <OutlineButton text='تحميل الكتاب' icon={Download} path={url} />
                                    <OutlineButton text='اقتراح تعديل ترجمة' icon={Edit} path={bookData?.drive_link} />
                                </Flex>

                                <Flex gap='middle' align='center' className='book-note'>
                                    <p>✍🏻 هل تعتقد ان ترجمة هذا الكتاب بحاجة إلى تحسين؟ يمكنك اقتراح تعديل الترجمة من الخاصية اعلاه</p>
                                </Flex>


                                <Flex wrap gap='middle' align='center' justify='space-between' className='book-bottom-actions'>
                                    <Flex wrap gap='middle' align='center'>
                                        <LikeButton name='books' id={bookData?.id} />
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
                            <Comments comments={comments} id={id} name='books' />
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
                {relatedItemsList?.length ? <Slider items={relatedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا يوجد كتب مشابهة</h2>}
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

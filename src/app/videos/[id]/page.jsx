import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getVideo } from '@/services/generalServices';
import { arabicDate } from '@/helpers/arabicDate'
import Play from '@/assets/images/icons/play.svg';
import Container from '@/components/Container/Container'
import Image from 'next/image'
import YoutubeIcon from '@/assets/images/icons/youtube-bg-white.svg'
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Slider from '@/components/Slider/Slider';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import Quote from '@/components/Quote/Quote';
import VideosPageL from '@/assets/images/icons/videos-page-l.png';
import VideosPageR from '@/assets/images/icons/videos-page-r.png';
import Share from '@/components/Share/Share';
import Comments from '@/components/Comments/Comments';
import Survey from '@/components/Survey/Survey';
import LikeButton from '@/components/Buttons/LikeButton';
import CommentButton from '@/components/Buttons/CommentButton';
import MainButton from '@/components/Buttons/MainButton';
import './page.css'

export default async function page({ params: { id } }) {
    const { data: videoData } = await getVideo(id);
    const relatedItemsData = videoData?.related_videos;
    const pollsData = videoData?.polls?.filter(poll => poll?.active);
    const comments = videoData?.comments;

    const relatedItemsList = relatedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='videos' img={item?.thumbnails} hoverImage={Play} title={item?.title} desc={item?.category?.name} views={item?.view_count} />
        )
    })

    return (
        <div className='video-page'>
            <title>{videoData?.title || ""}</title>
            <meta name="description" content={`${videoData?.category?.name} - ${videoData?.title || ""}`} />

            <section className='video-section'>
                <iframe
                    className='video-player'
                    src={`https://www.youtube.com/embed/${videoData?.video_id}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    title={videoData?.title}
                />
            </section>

            <div className='bg-gray'>
                <Container>
                    <Row className='video-content content' align='middle'>
                        <Col xs={24} lg={18}>
                            <p>
                                {videoData?.category?.name || ''}
                            </p>
                            <h4>
                                {videoData?.title || ''}
                            </h4>
                            <p>
                                {arabicDate(videoData?.published_at || '')} • {videoData?.view_count || ''} مشاهدة
                            </p>

                            <div className="video-actions">
                                <MainButton className='youtube-button' text='اشترك في القناة' icon={YoutubeIcon} path='https://www.youtube.com/@baytalhikma2' />
                                <LikeButton path={`https://www.youtube.com/watch?v=${videoData?.video_id}`} />
                                <CommentButton path={`https://www.youtube.com/watch?v=${videoData?.video_id}`} />
                            </div>
                        </Col>
                        <Col xs={24} lg={6}>
                            <Share />
                        </Col>
                    </Row>
                </Container>

                <Container>
                    <Row align='middle' gutter={[30, 30]}>
                        <Col xs={24} lg={14}>
                            <Comments createComment={false} comments={comments} id={id} name='videos' />
                        </Col>
                        <Col xs={24} lg={10}>
                            {pollsData?.length ? <Survey polls={pollsData} /> : <h2 className='no-result'>لا يوجد استبيانات</h2>}
                        </Col>
                    </Row>
                </Container>
            </div>

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>شاهد أيضاً</h2></div>
                    <Flex wrap align='center' gap={'middle'}>
                        <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                        <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                    </Flex>
                </Flex>
            </Container>

            <Container>
                <Slider items={relatedItemsList} className='selected-items-slider' centeredSlides={true} slidesPerView={3} spaceBetween={20} customArrow={true} />
            </Container>

            <Container>
                <Quote imgL={VideosPageL} imgR={VideosPageR} bgColor={'#F19298'}>
                    <div className='quote-content'>
                        <h2>“الحرية هي الحرية، وليست المساواة أو الإنصاف أو العدالة أو الثقافة، أو السعادة البشرية أو الضمير الهادئ.”</h2>
                        <p>أشعيا برلين</p>
                    </div>
                </Quote>
            </Container>
        </div >
    )
}

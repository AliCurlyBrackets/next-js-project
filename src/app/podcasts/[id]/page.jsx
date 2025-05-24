import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getPodcast } from '@/services/generalServices';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import Mic from '@/assets/images/icons/mic-white.svg'
import Container from '@/components/Container/Container';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import Quote from '@/components/Quote/Quote';
import Platforms from '@/components/Platforms/Platforms';
import TeamSliderCard from '@/components/Slider/TeamSliderCard';
import PodcastsQuote from '@/assets/images/icons/podcasts-quote.png';
import Comments from '@/components/Comments/Comments';
import Survey from '@/components/Survey/Survey';
import BackButton from '@/components/Buttons/BackButton';
import Rate from '@/components/Rate/Rate';
import Share from '@/components/Share/Share';
import Like from '@/assets/images/icons/like.svg';
import Comment from '@/assets/images/icons/comment.svg';
import OutlineButton from '@/components/Buttons/OutlineButton';
import LikeButton from '@/components/Buttons/LikeButton';
import CommentButton from '@/components/Buttons/CommentButton';
import EndPoint from '@/services/EndPoint';
import PlatformLink from '@/components/PlatformLink/PlatformLink';
import './page.css'

export default async function page({ params: { id } }) {
    const { ImgEndPoint } = EndPoint;
    const { data: podcastData } = await getPodcast(id);
    const pollsData = podcastData?.polls?.filter(poll => poll?.active);
    const relatedItemsData = podcastData?.related_podcasts;
    const comments = podcastData?.comments;
    const guests = podcastData?.guests;
    const links = podcastData?.links;

    const relatedItemsList = relatedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='podcasts' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImageText='استماع للبودكاست' hoverImage={Mic} title={item?.title} desc={item?.excerpt} />
        )
    })

    const teamList = guests?.map((team, index) => {
        return <TeamSliderCard key={team?.id || index} item={{ img: `${ImgEndPoint}${team?.thumbnails || ""}`, name: team?.name || "", position: team?.bio || "" }} />
    })

    const platformsList = links?.map((link, index) => {
        return <PlatformLink key={link?.id || index} link={link?.link} img={`${ImgEndPoint}${link?.platform?.icon || ""}`} />
    })

    return (
        <div className='podcast-page'>
            <title>{podcastData?.title || ""}</title>
            <meta name="description" content={podcastData?.excerpt || ""} />

            <section className='video-section'>
                <iframe
                    className='video-player'
                    src={`https://www.youtube.com/embed/${podcastData?.youtube_link}`}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    frameBorder="0"
                    width="100%"
                    height="100%"
                    title={podcastData?.title}
                />
            </section>

            <div className='bg-gray'>
                <Container>
                    <div className="podcast-info">
                        <Row gutter={[24, 24]} >
                            <Col xs={24} lg={6} className='podcast-image'>
                                <Image src={`${ImgEndPoint}${podcastData?.thumbnails || ""}`} alt={podcastData?.title || "title"} width='500' height='500' />
                            </Col>

                            <Col xs={24} lg={18} className='podcast-details'>
                                <BackButton text='العودة للخلف' />
                                <h2>
                                    {podcastData?.title}
                                </h2>
                                <p>
                                    {podcastData?.excerpt || ''}
                                </p>

                                <Flex gap='middle' align='center' className='podcast-rate'>
                                    <Rate name='podcasts' id={podcastData?.id} />
                                    <p className='m-0'>{podcastData?.average_rating || ''} • {podcastData?.rating_count || ''}</p>
                                </Flex>

                                <Flex gap='small' align='center' className='podcast-rate'>
                                    <Image src={Like} alt='like' />
                                    <p className='m-0'>{podcastData?.likes_count || '0'}</p>

                                    <Image src={Comment} alt='comment' />
                                    <p className='m-0'>{podcastData?.comments?.filter(comment => comment?.approved).length || '0'}</p>
                                </Flex>

                                <Flex wrap gap='middle' align='center' justify='space-between' className='podcast-bottom-actions'>
                                    <Flex wrap gap='middle' align='center'>
                                        <LikeButton name='podcasts' id={podcastData?.id} />
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
                        <Col xs={24} lg={24}>
                            <Comments comments={comments} id={id} name='podcasts' />
                        </Col>
                        {/* <Col xs={24} lg={10}>
                            {pollsData?.length ? <Survey polls={pollsData} /> : <h2 className='no-result'>لا يوجد استبيانات</h2>}
                        </Col> */}
                    </Row>
                </Container>
            </div>

            {/* <section className='platforms-section' data-aos="fade-up" data-aos-offset="0" style={{ margin: '100px 0px' }}>
                {platformsList?.length ? <Platforms platformsList={platformsList} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
            </section> */}

            <section className='team-section' data-aos="fade-up">
                <Container>
                    <div className="content line">
                        <h2 className='text-center'>ضيوف البرنامج</h2>
                    </div>
                </Container>

                <Container>
                    {teamList?.length ? <Slider items={teamList} className='team-slider' centeredSlides={true} slidesPerView={3} spaceBetween={75} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
                </Container>
            </section>

            <section style={{ backgroundColor: '#202956', overflow: 'hidden', padding: '50px 0px' }} data-aos="fade-up">
                <Row gutter={[24, 24]} align={'middle'} justify={'center'}>
                    <Col xs={24} lg={24}>
                        <Container>
                            <Quote className='podcasts-quote' imgL={PodcastsQuote} bgColor={'#202956'}>
                                <div className='quote-content'>
                                    <h2>ماهر جبره</h2>
                                    <h4>مُعد ومقدم البرنامج</h4>
                                    <p>صحفي وكاتب ومنتج محتوى رقمي. مهتم بقضايا الحريات الفردية، حقوق المرأة والأقليات، وملف الإصلاح الفكري والديني في الشرق الأوسط، وسط موضوعات أخرى. عمل سابقا كمدير تحرير بقسم الديجيتال بشبكة الشرق الأوسط للإرسال "MBN". وله مقالات في العديد من المواقع العربية والأميركية، كما يكتب مقالا أسبوعيا لموقع الحرة. مصري أمريكي، حاصل على الماجستير في علم النفس الاجتماعي من جامعة "بوسطن كوليدج" في الولايات المتحدة. وهو زميل الفولبرايت وزميل الديموقراطية لمعهد شؤون العالم في العاصمة الأمريكية واشنطن دي سي.</p>
                                </div>
                            </Quote>
                        </Container>
                    </Col>
                </Row>
            </section>

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>أحدث الحلقات من برنامج بالعربي</h2></div>
                    <OutlineButton text='جميع المقالات' icon={ArrowL} path='/podcasts?page=1&perPage=8&sort=desc&column=published_at&search=' />
                </Flex>
            </Container>

            <Container>
                {relatedItemsList?.length ? <Slider items={relatedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
            </Container>
        </div>
    )
}

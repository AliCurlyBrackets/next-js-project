import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getPodcasts, initPodcasts } from '@/services/generalServices';
import BelarabiHero from '@/assets/images/bel-arabi-hero.png';
import Container from '@/components/Container/Container';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Mic from '@/assets/images/icons/mic-white.svg';
import EndPoint from '@/services/EndPoint';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import Pagination from '@/components/Pagination/Pagination';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import Quote from '@/components/Quote/Quote';
import PodcastsQuote from '@/assets/images/icons/podcasts-quote.png';
import Platforms from '@/components/Platforms/Platforms';
import TeamSliderCard from '@/components/Slider/TeamSliderCard';
import NoBordersLogo from '@/assets/images/icons/no-borders-logo.png';
import './page.css'
import PlatformLink from '@/components/PlatformLink/PlatformLink';

export default async function page({ searchParams }) {
    const { ImgEndPoint } = EndPoint;
    const apiParams = {
        search: searchParams?.search || "",
        page: searchParams?.page || "",
        perPage: searchParams?.perPage || "",
        sort: searchParams?.sort || "desc",
        column: searchParams?.column || "created_at",
    };
    const path = new URLSearchParams(apiParams);
    const podcastsData = await getPodcasts(path.toString());
    const selectedItems = await initPodcasts();
    const podcasts = podcastsData?.data;
    const total = podcastsData?.meta?.total;
    const guests = selectedItems?.data?.find(item => item?.type == 'guests')?.data;
    const platforms = selectedItems?.data?.find(item => item?.type == 'platforms')?.data;
    const selectedItemsData = selectedItems?.data?.find(item => item?.type == 'featured_podcasts')?.data;

    const podcastsList = podcasts?.map((podcast, index) => {
        return (
            <Col xs={24} lg={6} key={podcast?.id || index}>
                <Vertical id={podcast?.id} path='podcasts' img={podcast?.thumbnails ? `${ImgEndPoint}${podcast?.thumbnails}` : ""} hoverImageText='استماع للبودكاست' hoverImage={Mic} title={podcast?.title} desc={podcast?.excerpt} />
            </Col>
        )
    })

    const selectedItemsList = selectedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='podcasts' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImageText='استماع للبودكاست' hoverImage={Mic} title={item?.title} desc={item?.excerpt} />
        )
    })

    const platformsList = platforms?.map((platform) => {
        return <PlatformLink key={platform?.id || index} link={platform?.link} img={`${ImgEndPoint}${platform?.icon || ""}`} />
    })

    const teamList = guests?.map((team) => {
        return <TeamSliderCard key={team?.id || index} item={{ img: `${ImgEndPoint}${team?.thumbnails || ""}`, name: team?.name || "", position: team?.bio || "" }} />
    })

    return (
        <div className='podcasts-page'>
            <title>بالعربي - بيت الحكمة</title>
            {/* <meta name="description" content="بالعربي - بيت الحكمة" /> */}

            <Breadcrumb className='belarabi-hero' img={BelarabiHero} bgColor="#c7caea" title='بودكاست بالعربي' desc='مبادرة جديدة لدعم الأصوات الحرة والقصص الملهمة في العالم العربي.' />

            <section className='selected-items-section' data-aos="fade-up" data-aos-offset="0">
                <Container>
                    <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                        <div className="content"><h2>اخترنا لك</h2></div>
                        <Flex wrap align='center' gap={'middle'}>
                            <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                            <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                        </Flex>
                    </Flex>
                </Container>

                <Container>
                    {selectedItemsList?.length ? <Slider items={selectedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا توجد بودكاست مختارة</h2>}
                </Container>
            </section>

            <section className='podcasts-section' data-aos="fade-up">
                <Container>
                    <div className="content"><h2>حلقات البودكاست</h2></div>
                    <Flex wrap className='page-title-filter' justify='flex-end' align='center' gap={'middle'}>
                        <Flex wrap align='center' gap={'middle'}>
                            <Filter className='filter-button' />
                            <Search className='off-white-search' placeholder='بحث في البودكاست...' icon={SearchIcon} />
                        </Flex>
                    </Flex>
                </Container>

                <Container>
                    <Row className='page-list' gutter={[24, 24]}>
                        {podcastsList?.length ? podcastsList : <h2 className='no-result'>لا توجد بودكاست تتناسب مع مدخلاتك</h2>}
                    </Row>
                </Container>

                <Container>
                    <Flex className='page-pagination'>
                        <Pagination total={total} page={apiParams?.page} perPage={apiParams?.perPage} />
                    </Flex>
                </Container >
            </section>

            <section className='platforms-section' data-aos="fade-up" data-aos-offset="0" style={{ margin: '100px 0px' }}>
                {platformsList?.length ? <Platforms platformsList={platformsList} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
            </section>

            <section style={{ backgroundColor: '#202956', overflow: 'hidden', padding: '50px 0px', marginTop: '50px' }} data-aos="fade-up">
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

            <section className='team-section' data-aos="fade-up">
                <Container>
                    <div className="content line">
                        <h2 className='text-center'>ضيوف البرنامج</h2>
                    </div>
                </Container>

                <Container>
                    <Slider items={teamList} className='team-slider' centeredSlides={true} slidesPerView={3} spaceBetween={75} />
                </Container>
            </section>

            <section data-aos="fade-up" data-aos-offset="0" style={{ padding: '100px 0px' }}>
                <Container>
                    <div className="content">
                        <h2 className='text-center'>هذا البودكاست مدعوم من</h2>
                    </div>
                    <Row gutter={[24, 24]} align={'middle'} justify={'center'}>
                        <Col xs={24} lg={24}>
                            <div className="content text-center">
                                <Image src={NoBordersLogo} alt='podcasts-quote' width='500' height='500' style={{ marginBottom: '50px' }} />
                                <p className='text-center'>منظمة أفكار بلا حدود، هي المنظمة الراعية لبرنامج بيت الحكمة 2.0. المنظمة تدعم الأفكار المناهضة للتطرف، الديكتاتورية، العنف وحجب المعلومات المنتشر في منطقة الشرق الأوسط. نحن نشارك، نترجم، وندعم الأفكار التي تعزز التفكير النقدي، الحقوق المدنية، حقوق الإنسان، العلوم والتعددية وسط أفكار أخرى. ونهدف إلى أن نحيا في شرق أوسط يحترم التنوع والتعددية ويعبر عن شعوب المنطقة</p>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </div>
    )
}

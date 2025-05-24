import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getVideos, initVideos } from '@/services/generalServices';
import VideosHero from '@/assets/images/videos-hero.png';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import YoutubeIcon from '@/assets/images/icons/youtube-bg-red.svg'
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import FilterCategory from '@/components/Filter/FilterCategory';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import SubscribeImage from '@/assets/images/subscribe.png';
import Play from '@/assets/images/icons/play.svg'
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import Link from 'next/link';
import './page.css'

export default async function page({ searchParams }) {
    const apiParams = {
        search: searchParams?.search || "",
        page: searchParams?.page || "",
        perPage: searchParams?.perPage || "",
        sort: searchParams?.sort || "desc",
        column: searchParams?.column || "created_at",
        category_id: searchParams?.category || "",
    };
    const path = new URLSearchParams(apiParams);
    const videosData = await getVideos(path.toString());
    const selectedItems = await initVideos();
    const videos = videosData?.data;
    const total = videosData?.meta?.total;
    const subCategories = selectedItems?.data?.find(item => item?.type == 'subcategories')?.data;
    const selectedItemsData = selectedItems?.data?.find(item => item?.type == 'featured_videos')?.data;

    const videosListComponent = videos?.map((video, index) => {
        return (
            <Col xs={24} lg={6} key={video?.id || index}>
                <Vertical id={video?.id} path='videos' img={video?.thumbnails ? `${video?.thumbnails}` : ""} hoverImage={Play} title={video?.title} desc={video?.category?.name} views={video?.view_count} />
            </Col>
        )
    })

    const subscribeCard = (
        <Col xs={24} lg={12}>
            <Link target='_blank' href={'https://www.youtube.com/@baytalhikma2'} className="subscribtion-card"><Image src={SubscribeImage} alt='subscribe' /></Link>
        </Col>
    )

    const videosList = videosListComponent?.length ? [...videosListComponent?.slice(0, 4), subscribeCard, ...videosListComponent?.slice(4)] : null;

    const selectedItemsList = selectedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='videos' img={item?.thumbnails} hoverImage={Play} title={item?.title} desc={item?.category?.name} views={item?.view_count} />
        )
    })

    return (
        <>
            <Breadcrumb
                className='videos-hero'
                img={VideosHero}
                bgColor="#EE5A50"
                title='فيديوهات'
                desc='المعرفة التي تحتاج إليها لتمكين مستقبلك وإعادة بناء بيت الحكمة الأصلي.'
                buttonClass="youtube-button"
                buttonText="اشترك في قناة بيت الحكمة على اليوتيوب"
                buttonIcon={YoutubeIcon}
                buttonPath={"https://www.youtube.com/@baytalhikma2"}
            />

            <title>الفيديوهات - بيت الحكمة</title>
            {/* <meta name="description" content="الفيديوهات - بيت الحكمة" /> */}

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>فيديوهات مختارة</h2></div>
                    <Flex wrap align='center' gap={'middle'}>
                        <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                        <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                    </Flex>
                </Flex>
            </Container>

            <Container>
                {selectedItemsList?.length ? <Slider items={selectedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا توجد كتب مختارة</h2>}
            </Container>

            <Container>
                <div className="content"><h2>لائحة الفيديوهات</h2></div>
                <Flex wrap className='page-title-filter' justify='flex-end' align='center' gap={'middle'}>
                    <Flex wrap align='center' gap={'middle'}>
                        <FilterCategory className='filter-button' items={subCategories} />
                        <Filter className='filter-button' />
                        <Search className='off-white-search' placeholder='بحث في الفيديوهات...' icon={SearchIcon} />
                    </Flex>
                </Flex>
            </Container>

            <Container>
                <Row className='page-list' gutter={[24, 24]}>
                    {videosList?.length ? videosList : <h2 className='no-result'>لا توجد فيديوهات تتناسب مع مدخلاتك</h2>}
                </Row>
            </Container>

            <Container>
                <Flex className='page-pagination'>
                    <Pagination total={total} page={apiParams?.page} perPage={apiParams?.perPage} />
                </Flex>
            </Container >
        </>
    )
}

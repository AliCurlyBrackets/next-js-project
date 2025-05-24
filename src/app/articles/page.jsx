import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getArticles, initArticles } from '@/services/generalServices';
import ArticleHero from '@/assets/images/articles-hero.png';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import Glasses from '@/assets/images/icons/glasses.svg'
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Horizontal from '@/components/TabsContent/Cards/Horizontal';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import EndPoint from '@/services/EndPoint';
import FilterCategory from '@/components/Filter/FilterCategory';
import './page.css'

export default async function page({ searchParams }) {
    const { ImgEndPoint } = EndPoint;
    const apiParams = {
        search: searchParams?.search || "",
        page: searchParams?.page || "",
        perPage: searchParams?.perPage || "",
        sort: searchParams?.sort || "desc",
        column: searchParams?.column || "created_at",
        category_id: searchParams?.category || "",
    };
    const path = new URLSearchParams(apiParams);
    const articlesData = await getArticles(path.toString());
    const selectedItems = await initArticles();
    const articles = articlesData?.data;
    const total = articlesData?.meta?.total;
    const subCategories = selectedItems?.data?.find(item => item?.type == 'subcategories')?.data;
    const selectedItemsData = selectedItems?.data?.find(item => item?.type == 'featured_articles')?.data;
    const mostReadItemsData = selectedItems?.data?.find(item => item?.type == 'most_read_articles')?.data;

    const articlesList = articles?.map((article, index) => {
        return (
            <Col xs={24} key={article?.id || index}>
                <Horizontal id={article?.id} path='articles' img={article?.thumbnails ? `${ImgEndPoint}${article?.thumbnails}` : ""} hoverImage={Glasses} hoverImageText='قراءة المقال' title={article?.title} desc={article?.excerpt} category={article?.category?.name} />
            </Col>
        )
    })

    const selectedItemsList = selectedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='articles' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImage={Glasses} hoverImageText='قراءة المقال' title={item?.title} desc={item?.excerpt} category={item?.category?.name} />
        )
    })

    const mostReadItemsList = mostReadItemsData?.map((item, index) => {
        return (
            <Col xs={24} key={item?.id || index}>
                <Vertical id={item?.id} path='articles' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImage={Glasses} hoverImageText='قراءة المقال' title={item?.title} desc={item?.excerpt} category={item?.category?.name} />
            </Col>
        )
    })

    return (
        <>
            <Breadcrumb className='articles-hero' img={ArticleHero} bgColor="#ffffff" title='مدونة بيت الحكمة' desc='أخبار ومقالات بيت الحكمة' />
            <title>المدونة - بيت الحكمة</title>
            {/* <meta name="description" content="المدونة - بيت الحكمة" /> */}

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>مقالات مختارة</h2></div>
                    <Flex wrap align='center' gap={'middle'}>
                        <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                        <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                    </Flex>
                </Flex>
            </Container>

            <Container>
                {selectedItemsList?.length ? <Slider items={selectedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا توجد مقالات مختارة</h2>}
            </Container>

            <Container>
                <div className="content"><h2>لائحة المقالات</h2></div>
                <Flex wrap className='page-title-filter' justify='flex-end' align='center' gap={'middle'}>
                    <Flex wrap align='center' gap={'middle'}>
                        <FilterCategory className='filter-button' items={subCategories} />
                        <Filter className='filter-button' />
                        <Search className='off-white-search' placeholder='بحث في المقالات...' icon={SearchIcon} />
                    </Flex>
                </Flex>
            </Container>

            <Container>
                <Row className='page-list' gutter={[24, 24]}>
                    <Col xs={24} lg={18}>
                        <Row gutter={[24, 24]}>
                            {articlesList?.length ? articlesList : <h2 className='no-result'>لا توجد مقالات تتناسب مع مدخلاتك</h2>}
                        </Row>
                    </Col>
                    <Col xs={24} lg={6}>
                        <Row gutter={[24, 24]}>
                            <div className="content"><h2>المقالات الاكثر قراءة</h2></div>
                            {mostReadItemsList?.length ? mostReadItemsList : <h2 className='no-result'>لا توجد مقالات اكثر قراءة</h2>}
                        </Row>
                    </Col>
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

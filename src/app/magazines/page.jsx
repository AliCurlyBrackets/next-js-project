import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getMagazines, initMagazines } from '@/services/generalServices';
import MagazinesHero from '@/assets/images/magazine-hero.png';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import ArrowR from '@/assets/images/icons/arrow-right.svg';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import BookWhite from '@/assets/images/icons/book-white.svg'
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import Slider from '@/components/Slider/Slider';
import Image from 'next/image';
import Quote from '@/components/Quote/Quote';
import MagazinesQuote from '@/assets/images/icons/books-quote.png';
import EndPoint from '@/services/EndPoint';
import './page.css'

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
    const magazinesData = await getMagazines(path.toString());
    const selectedItems = await initMagazines();
    const magazines = magazinesData?.data;
    const total = magazinesData?.meta?.total;
    const selectedItemsData = selectedItems?.data?.find(item => item?.type == 'featured_magazines')?.data;

    const magazinesList = magazines?.map((magazine, index) => {
        return (
            <Col xs={24} lg={6} key={magazine?.id || index}>
                <Vertical className='heighter' id={magazine?.id} path='magazines' img={magazine?.thumbnails ? `${ImgEndPoint}${magazine?.thumbnails}` : ""} hoverImageText='قراءة المجلة' hoverImage={BookWhite} title={magazine?.title} />
            </Col>
        )
    })

    const selectedItemsList = selectedItemsData?.map((item, index) => {
        return (
            <Vertical className='heighter' key={item?.id || index} id={item?.id} path='magazines' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImageText='قراءة المجلة' hoverImage={BookWhite} title={item?.title} />
        )
    })

    return (
        <div className='magazines-page'>
            <title>المجلات - بيت الحكمة</title>
            {/* <meta name="description" content="المجلات - بيت الحكمة" /> */}

            <Breadcrumb className='magazines-hero' img={MagazinesHero} bgColor="#425BA7" title='مجلات' desc='نريد أن نكون أكبر مجلة ناطقة بالعربية على الشبكة في العالم، ونحن بحاجة الى مساعدتك لقراءة مضاميننا ونشرها.' />

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>مجلات مختارة</h2></div>
                    <Flex wrap align='center' gap={'middle'}>
                        <div className="swiper-button-next"><Image src={ArrowR} alt='arrow-right' /></div>
                        <div className="swiper-button-prev"><Image src={ArrowL} alt='arrow-left' /></div>
                    </Flex>
                </Flex>
            </Container>

            <Container>
                {selectedItemsList?.length ? <Slider items={selectedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا توجد مجلات مختارة</h2>}
            </Container>

            <Container>
                <div className="content"><h2>لائحة المجلات</h2></div>
                <Flex wrap className='page-title-filter' justify='flex-end' align='center' gap={'middle'}>
                    <Flex wrap align='center' gap={'middle'}>
                        <Filter className='filter-button' />
                        <Search className='off-white-search' placeholder='بحث في المجلات...' icon={SearchIcon} />
                    </Flex>
                </Flex>
            </Container>

            <Container>
                <Row className='page-list' gutter={[24, 24]}>
                    {magazinesList?.length ? magazinesList : <h2 className='no-result'>لا توجد مجلات تتناسب مع مدخلاتك</h2>}
                </Row>
            </Container>

            <Container>
                <Flex className='page-pagination'>
                    <Pagination total={total} page={apiParams?.page} perPage={apiParams?.perPage} />
                </Flex>
            </Container >

            <Container>
                <Row gutter={[24, 24]} align={'middle'} justify={'center'} >
                    <Col xs={24} lg={24}>
                        <Quote className='magazines-quote' img={MagazinesQuote} bgColor={'#202956'} raduis={12}>
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

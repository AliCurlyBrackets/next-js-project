import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getBooks, initBooks } from '@/services/generalServices';
import BooksHero from '@/assets/images/books-hero.png';
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
import BooksQuote from '@/assets/images/icons/books-quote.png';
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
    const booksData = await getBooks(path.toString());
    const selectedItems = await initBooks();
    const books = booksData?.data;
    const total = booksData?.meta?.total;
    const subCategories = selectedItems?.data?.find(item => item?.type == 'subcategories')?.data;
    const selectedItemsData = selectedItems?.data?.find(item => item?.type == 'featured_books')?.data;

    const booksList = books?.map((book, index) => {
        return (
            <Col xs={24} lg={6} key={book?.id || index}>
                <Vertical className='heighter' id={book?.id} path='books' img={book?.thumbnails ? `${ImgEndPoint}${book?.thumbnails}` : ""} hoverImageText='قراءة الكتاب' hoverImage={BookWhite} title={book?.title} desc={book?.author} />
            </Col>
        )
    })

    const selectedItemsList = selectedItemsData?.map((item, index) => {
        return (
            <Vertical className='heighter' key={item?.id || index} id={item?.id} path='books' img={item?.thumbnails ? `${ImgEndPoint}${item?.thumbnails}` : ""} hoverImageText='قراءة الكتاب' hoverImage={BookWhite} title={item?.title} desc={item?.author} />
        )
    })

    return (
        <div className='books-page'>
            <title>كتب - بيت الحكمة</title>
            {/* <meta name="description" content="كتب - بيت الحكمة" /> */}
            
            <Breadcrumb className='books-hero' img={BooksHero} bgColor="#FFF2F2" title='كتب' desc='نسعى إلى ترجمة كتب عدّة ونريدك أن تكون جُزءًا من مهمتنا من خلال قراءتها واقتراح تعديلاتك إن وجدت، ونشر هذه الكتب لتصل إلى شريحة أكبر.' />
            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>كتب مختارة</h2></div>
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
                <div className="content"><h2>لائحة الكتب</h2></div>
                <Flex wrap className='page-title-filter' justify='flex-end' align='center' gap={'middle'}>
                    <Flex wrap align='center' gap={'middle'}>
                        <FilterCategory className='filter-button' items={subCategories} />
                        <Filter className='filter-button' />
                        <Search className='off-white-search' placeholder='بحث في الكتب...' icon={SearchIcon} />
                    </Flex>
                </Flex>
            </Container>

            <Container>
                <Row className='page-list' gutter={[24, 24]}>
                    {booksList?.length ? booksList : <h2 className='no-result'>لا توجد كتب تتناسب مع مدخلاتك</h2>}
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
                        <Quote className='books-quote' img={BooksQuote} bgColor={'#202956'} raduis={12}>
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

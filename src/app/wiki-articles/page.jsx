import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getSubCategories, getWikiArticles } from '@/services/generalServices';
import WikiArticleHero from '@/assets/images/wiki-hero.png';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import Glasses from '@/assets/images/icons/glasses.svg'
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import EndPoint from '@/services/EndPoint';
import './page.css'
import FilterCategory from '@/components/Filter/FilterCategory';

export default async function page({  searchParams }) {
    const { ImgEndPoint } = EndPoint
    const apiParams = {
        search: searchParams?.search || "",
        page: searchParams?.page || "",
        perPage: searchParams?.perPage || "",
        sort: searchParams?.sort || "desc",
        column: searchParams?.column || "created_at",
        category_id: searchParams?.category || "",
    };
    const path = new URLSearchParams(apiParams);
    const wikiArticlesData = await getWikiArticles(path.toString());
    const articles = wikiArticlesData?.data;
    const total = wikiArticlesData?.meta?.total;
    const subCategoriesData = await getSubCategories(`parent_id=6&paginate=0`);
    const subCategories = subCategoriesData?.data;

    return (
        <>
            <Breadcrumb className='wiki-articles-hero' img={WikiArticleHero} bgColor="#1F2857" title='مقالات ويكيبيديا' desc={`المعرفة التي تحتاج إليها لتمكين مستقبلك وإعادة بناء بيت الحكمة الأصلي. <br /> منذ عام 2018، ساهم مشروع بيت الحكمة 2.0 بترجمة وتطوير أكثر من 35,000 مقالة على ويكيبيديا`} />
            <title>مقالات الويكيبيديا - بيت الحكمة</title>
            {/* <meta name="description" content="مقالات الويكيبيديا - بيت الحكمة" /> */}

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
                    {articles?.length ? articles?.map((article, index) => (
                        <Col xs={24} lg={6} key={article?.id || index}>
                            <Vertical externalLink={article?.wiki_link} img={article?.thumbnails ? `${ImgEndPoint}${article?.thumbnails}` : ""} hoverImage={Glasses} hoverImageText='قراءة المقال' title={article?.title} desc={article?.category?.name} />
                        </Col>
                    )) : <h2 className='no-result'>لا توجد مقالات تتناسب مع مدخلاتك</h2>}
                </Row>
            </Container>

            <Container>
                <Flex className='page-pagination'>
                    <Pagination total={total} page={apiParams?.page} perPage={apiParams?.perPage} />
                </Flex>
            </Container>
        </>
    )
}

import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getArticle } from '@/services/generalServices';
import ArrowL from '@/assets/images/icons/arrow-left.svg';
import Glasses from '@/assets/images/icons/glasses.svg';
import Container from '@/components/Container/Container';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Slider from '@/components/Slider/Slider';
import BackButton from '@/components/Buttons/BackButton';
import Share from '@/components/Share/Share';
import OutlineButton from '@/components/Buttons/OutlineButton';
import EndPoint from '@/services/EndPoint';
import './page.css'

export default async function page({ params: { id } }) {
    const { ImgEndPoint } = EndPoint;
    const { data: articleData } = await getArticle(id);
    const relatedItemsData = articleData?.related_articles;

    const relatedItemsList = relatedItemsData?.map((item, index) => {
        return (
            <Vertical key={item?.id || index} id={item?.id} path='articles' img={`${ImgEndPoint}${item?.thumbnails || ""}`} hoverImageText='قراءة المقال' hoverImage={Glasses} title={item?.title} desc={item?.excerpt} category={item?.category?.name} />
        )
    })

    return (
        <div className='article-page'>
            <title>{articleData?.title || ""}</title>
            <meta name="description" content={articleData?.excerpt || ""} />

            <div className='article-bg-image' style={{ backgroundImage: `url(${ImgEndPoint}${articleData?.thumbnails || ""})` }}>
                <Container>
                    <div className="article-info">
                        <Row gutter={[24, 24]} >
                            <Col xs={24} lg={14} className='article-details'>
                                <BackButton text='العودة للخلف' />
                                <div className="content"><h2>{articleData?.title}</h2><p>{articleData?.category?.name}</p></div>
                                <Share />
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="article-quill">
                    <div className="content" dangerouslySetInnerHTML={{ __html: articleData?.content }} />
                </div>
            </Container>

            <Container>
                <Flex wrap className='selected-items' justify='space-between' align='center' gap={'middle'}>
                    <div className="content"><h2>قراءة المزيد</h2></div>
                    <OutlineButton text='جميع المقالات' icon={ArrowL} path='/articles?page=1&perPage=8&sort=desc&column=published_at&search=&category=' />
                </Flex>
            </Container>

            <Container>
                {relatedItemsList?.length > 0 ? <Slider items={relatedItemsList} className='selected-items-slider' centeredSlides={false} slidesPerView={4} spaceBetween={20} customArrow={true} /> : <h2 className='no-result'>لا يوجد مقالات ذات صلة</h2>}
            </Container>
        </div>
    )
}
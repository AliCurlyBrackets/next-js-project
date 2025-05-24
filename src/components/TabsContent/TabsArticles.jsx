import React from 'react'
import { Col, Row } from 'antd'
import Vertical from './Cards/Vertical'
import Horizontal from './Cards/Horizontal'
import Glasses from '@/assets/images/icons/glasses.svg'
import EndPoint from '@/services/EndPoint'

export default function TabsArticles({ articles = [] }) {
    const { ImgEndPoint } = EndPoint
    const position1 = articles?.find(article => article.position == 1) || {};
    const position2 = articles?.find(article => article.position == 2) || {};
    const position3 = articles?.find(article => article.position == 3) || {};
    const position4 = articles?.find(article => article.position == 4) || {};

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
                {/* position1 */}
                <Vertical className='heighter' id={position1?.id || ""} path='articles' img={position1?.thumbnails ? `${ImgEndPoint}${position1?.thumbnails || ""}` : ""} title={position1?.title || ""} desc={position1?.excerpt || ""} hoverImage={Glasses} hoverImageText='قراءة المقال' category={position1?.category?.name} />
            </Col>
            <Col xs={24} lg={12}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} lg={24}>
                        {/* position2 */}
                        <Horizontal id={position2.id || ""} path='articles' img={position2?.thumbnails ? `${ImgEndPoint}${position2?.thumbnails || ""}` : ""} title={position2.title || ""} desc={position2.excerpt || ""} hoverImage={Glasses} hoverImageText='قراءة المقال' category={position2?.category?.name} />
                    </Col>
                    <Col xs={24} lg={12}>
                        {/* position3 */}
                        <Vertical id={position3?.id || ""} path='articles' img={position3?.thumbnails ? `${ImgEndPoint}${position3?.thumbnails || ""}` : ""} title={position3?.title || ""} desc={position3?.excerpt || ""} hoverImage={Glasses} hoverImageText='قراءة المقال' category={position3.category?.name} />
                    </Col>
                    <Col xs={24} lg={12}>
                        {/* position4 */}
                        <Vertical id={position4?.id || ""} path='articles' img={position4?.thumbnails ? `${ImgEndPoint}${position4?.thumbnails || ""}` : ""} title={position4?.title || ""} desc={position4?.excerpt || ""} hoverImage={Glasses} hoverImageText='قراءة المقال' category={position4?.category?.name} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

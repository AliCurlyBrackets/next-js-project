import { Col, Row } from 'antd'
import React from 'react'
import Vertical from './Cards/Vertical'
import Horizontal from './Cards/Horizontal'
import Mic from '@/assets/images/icons/mic-white.svg'
import EndPoint from '@/services/EndPoint'

export default function TabsPodcasts({ podcasts = [] }) {
    const { ImgEndPoint } = EndPoint
    const position1 = podcasts?.find(podcast => podcast?.position == 1) || {};
    const position2 = podcasts?.find(podcast => podcast?.position == 2) || {};
    const position3 = podcasts?.find(podcast => podcast?.position == 3) || {};
    const position4 = podcasts?.find(podcast => podcast?.position == 4) || {};

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
                <Vertical className='heighter' id={position1?.id || ""} path='podcasts' img={position1?.thumbnails ? `${ImgEndPoint}${position1?.thumbnails || ""}` : ""} title={position1?.title || ""} desc={position1?.excerpt || ""} hoverImage={Mic} hoverImageText='استماع للبودكاست' />
            </Col>
            <Col xs={24} lg={12}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} lg={24}>
                        <Horizontal id={position2?.id || ""} path='podcasts' img={position2?.thumbnails ? `${ImgEndPoint}${position2?.thumbnails || ""}` : ""} title={position2?.title || ""} desc={position2?.excerpt || ""} hoverImage={Mic} hoverImageText='استماع للبودكاست' />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Vertical id={position3?.id || ""} path='podcasts' img={position3?.thumbnails ? `${ImgEndPoint}${position3?.thumbnails || ""}` : ""} title={position3?.title || ""} desc={position3?.excerpt || ""} hoverImage={Mic} hoverImageText='استماع للبودكاست' />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Vertical id={position4?.id || ""} path='podcasts' img={position4?.thumbnails ? `${ImgEndPoint}${position4?.thumbnails || ""}` : ""} title={position4?.title || ""} desc={position4?.excerpt || ""} hoverImage={Mic} hoverImageText='استماع للبودكاست' />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

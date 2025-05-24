import React from 'react'
import { Col, Row } from 'antd'
import Vertical from './Cards/Vertical'
import Horizontal from './Cards/Horizontal'
import Play from '@/assets/images/icons/play.svg'

export default function TabsVideos({ videos = [] }) {
    const position1 = videos?.find(video => video.position == 1) || {};
    const position2 = videos?.find(video => video.position == 2) || {};
    const position3 = videos?.find(video => video.position == 3) || {};
    const position4 = videos?.find(video => video.position == 4) || {};

    return (
        <Row gutter={[12, 12]}>
            <Col xs={24} lg={12}>
                <Vertical className='heighter' id={position1?.id || ""} path='videos' img={position1?.thumbnails ? `${position1?.thumbnails || ""}` : ""} title={position1?.title || ""} desc={position1?.category?.name || ""} hoverImage={Play} />
            </Col>
            <Col xs={24} lg={12}>
                <Row gutter={[12, 12]}>
                    <Col xs={24} lg={24}>
                        <Horizontal id={position2?.id || ""} path='videos' img={position2?.thumbnails ? `${position2?.thumbnails || ""}` : ""} title={position2?.title || ""} desc={position2?.category?.name || ""} hoverImage={Play} />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Vertical id={position3?.id || ""} path='videos' img={position3?.thumbnails ? `${position3?.thumbnails || ""}` : ""} title={position3?.title || ""} desc={position3?.category?.name || ""} hoverImage={Play} />
                    </Col>
                    <Col xs={24} lg={12}>
                        <Vertical id={position4?.id || ""} path='videos' img={position4?.thumbnails ? `${position4?.thumbnails || ""}` : ""} title={position4?.title || ""} desc={position4?.category?.name || ""} hoverImage={Play} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}

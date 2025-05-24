import { Col, Row } from 'antd'
import React from 'react'
import Vertical from './Cards/Vertical'
import MagazineWhite from '@/assets/images/icons/book-white.svg'
import EndPoint from '@/services/EndPoint'

export default function TabsMagazines({ magazines = [] }) {
  const { ImgEndPoint } = EndPoint
  const position1 = magazines?.find(magazine => magazine.position == 1) || {};
  const position2 = magazines?.find(magazine => magazine.position == 2) || {};
  const position3 = magazines?.find(magazine => magazine.position == 3) || {};
  const position4 = magazines?.find(magazine => magazine.position == 4) || {};

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position1?.id || ""} path='magazines' img={position1?.thumbnails ? `${ImgEndPoint}${position1?.thumbnails || ""}` : ""} title={position1?.title || ""} desc={position1?.author || ""} hoverImage={MagazineWhite} hoverImageText="قراءة المجلة" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position2?.id || ""} path='magazines' img={position2?.thumbnails ? `${ImgEndPoint}${position2?.thumbnails || ""}` : ""} title={position2?.title || ""} desc={position2?.author || ""} hoverImage={MagazineWhite} hoverImageText="قراءة المجلة" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position3?.id || ""} path='magazines' img={position3?.thumbnails ? `${ImgEndPoint}${position3?.thumbnails || ""}` : ""} title={position3?.title || ""} desc={position3?.author || ""} hoverImage={MagazineWhite} hoverImageText="قراءة المجلة" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position4?.id || ""} path='magazines' img={position4?.thumbnails ? `${ImgEndPoint}${position4?.thumbnails || ""}` : ""} title={position4?.title || ""} desc={position4?.author || ""} hoverImage={MagazineWhite} hoverImageText="قراءة المجلة" />
      </Col>
    </Row>
  )
}

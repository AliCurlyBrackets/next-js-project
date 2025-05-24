import { Col, Row } from 'antd'
import React from 'react'
import Vertical from './Cards/Vertical'
import BookWhite from '@/assets/images/icons/book-white.svg'
import EndPoint from '@/services/EndPoint'

export default function TabsBooks({ books = [] }) {
  const { ImgEndPoint } = EndPoint
  const position1 = books?.find(book => book.position == 1) || {};
  const position2 = books?.find(book => book.position == 2) || {};
  const position3 = books?.find(book => book.position == 3) || {};
  const position4 = books?.find(book => book.position == 4) || {};

  return (
    <Row gutter={[12, 12]}>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position1?.id || ""} path='books' img={position1?.thumbnails ? `${ImgEndPoint}${position1?.thumbnails || ""}` : ""} title={position1?.title || ""} desc={position1?.author || ""} hoverImage={BookWhite} hoverImageText="قراءة الكتاب" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position2?.id || ""} path='books' img={position2?.thumbnails ? `${ImgEndPoint}${position2?.thumbnails || ""}` : ""} title={position2?.title || ""} desc={position2?.author || ""} hoverImage={BookWhite} hoverImageText="قراءة الكتاب" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position3?.id || ""} path='books' img={position3?.thumbnails ? `${ImgEndPoint}${position3?.thumbnails || ""}` : ""} title={position3?.title || ""} desc={position3?.author || ""} hoverImage={BookWhite} hoverImageText="قراءة الكتاب" />
      </Col>
      <Col xs={24} lg={6}>
        <Vertical className='heighter' id={position4?.id || ""} path='books' img={position4?.thumbnails ? `${ImgEndPoint}${position4?.thumbnails || ""}` : ""} title={position4?.title || ""} desc={position4?.author || ""} hoverImage={BookWhite} hoverImageText="قراءة الكتاب" />
      </Col>
    </Row>
  )
}

'use client'

import React from 'react'
import { Col, Row } from 'antd'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Eye from '@/assets/images/icons/eye-white.svg'
import EmptyImg from '@/assets/images/empty.jpg'
import "./Cards.css"

export default function Horizontal({ id, path, externalLink, className, img, title, desc, category, views, hoverImage, hoverImageText, onClick }) {
    const router = useRouter();
    const url = externalLink ? externalLink : (id && path) ? `/${path}/${id}` : null;

    const handleRoute = () => {
        if (externalLink) { window.open(url, '_blank') }
        else if (url) { router.push(url) }
        else if (onClick) { onClick() }
        else { console.log('No URL provided') }
    }

    return (
        <Row className={`horizontal-card ${className}`} gutter={[24, 24]} align='middle' onClick={handleRoute}>
            <Col xs={24} lg={12}>
                {img && (
                    <div className="img">
                        <Image src={img || EmptyImg} alt={"img"} width='500' height='500' />
                        {(hoverImageText || hoverImage) && (
                            <div className="hover-layer">
                                <div className="hover-btn">
                                    {hoverImageText && <p>{hoverImageText}</p>}{hoverImage && <Image src={hoverImage} alt={hoverImageText || "Image"} />}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </Col>
            <Col xs={24} lg={12}>
                {category && <p>{category}</p>}
                {title && <h4>{title}</h4>}
                {desc && <p>{desc}</p>}
                {views && <Flex className='views-row' align='center' gap='small'><Image src={Eye} alt="views" /> <p>{views}</p></Flex>}
            </Col>
        </Row>
    )
}

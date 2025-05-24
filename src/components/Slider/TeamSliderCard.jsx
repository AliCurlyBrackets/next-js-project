'use client'

import React from 'react'
import Image from 'next/image';

export default function TeamSliderCard({ item = {} }) {

    return (
        <>
            <Image src={item?.img || ""} alt={item?.position || "position"} width={500} height={500} />
            <p className='m-0 text-center'>{item?.name || ""}</p>
            <h4 className='m-0 text-center'>{item?.position || ""}</h4>
        </>
    )
}
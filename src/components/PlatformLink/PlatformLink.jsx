import Image from 'next/image'
import React from 'react'

export default function PlatformLink({ link, img }) {
    return (
        <a href={link} className='platform-link' target='_blank' rel='noreferrer'><Image src={img} alt='platform' width='500' height='500' /></a>
    )
}

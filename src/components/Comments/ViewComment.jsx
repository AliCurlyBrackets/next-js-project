import React from 'react'
import User from '@/assets/images/icons/user.svg'
import Image from 'next/image'

export default function Comment({ right = false, left = false, name = "", comment = "", date = "" }) {
    return (
        <div className={`comment-view ${right ? 'right' : 'left'}`}>
            {right && <Image src={User} alt='user' />}
            <div className='comment-content'>
                <h5>{name}</h5>
                <div dangerouslySetInnerHTML={{ __html: comment }} />
                <span>{date}</span>
            </div>
            {left && <Image src={User} alt='user' />}
        </div>
    )
}

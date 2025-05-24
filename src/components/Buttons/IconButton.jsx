import Image from 'next/image'
import React from 'react'

export default function IconButton({ icon = "", className = "", onClick = () => { } }) {
    return (
        <button className={`btn ${className}`} onClick={onClick}>
            <Image src={icon} alt="icon" width={20} height={20} />
        </button>
    )
}

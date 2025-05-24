"use client";

import React, { useState } from 'react'
import Image from 'next/image'
import './NumbersCard.css'

export default function NumbersCard({ title = "", number = "", icon = "", activeIcon = "" }) {
    const [hover, setHover] = useState(false)

    return (
        <div className={`numbers-card ${hover ? 'active' : ''}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
            {hover ? <Image src={activeIcon} alt='Numbers Card Active Icon' /> : <Image src={icon} alt='Numbers Card Icon' />}
            <h4>
                {number}
            </h4>
            <p>
                {title}
            </p>
        </div>
    )
}

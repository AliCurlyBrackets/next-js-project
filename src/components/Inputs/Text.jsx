'use client'

import { Input } from 'antd'
import Image from 'next/image'
import React from 'react'
import './inputs.css'

export default function Text({ className = "", icon = "", label = "", name = "", placeholder = "", state = "", size = "", disabdle = false, required = false, setState = () => { } }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <Input
                type="text"
                size={size}
                prefix={icon ? <Image src={icon} alt="icon" width={20} height={20} /> : null}
                className={className}
                name={name}
                id={name}
                placeholder={placeholder}
                value={state}
                disabled={disabdle}
                required={required}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    )
}

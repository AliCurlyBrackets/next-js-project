'use client'

import { Input } from 'antd'
import React from 'react'
import './inputs.css'

export default function Textarea({ className = "", label = "", name = "", placeholder = "", state = "", disabdle = false, required = false, setState = () => { } }) {
    const { TextArea } = Input;

    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <TextArea
                rows={4}
                className={className}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabdle}
                required={required}
                value={state}
                onChange={(e) => setState(e.target.value)}
            />
        </div>
    )
}

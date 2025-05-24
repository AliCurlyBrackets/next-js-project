'use client'

import { Select as AntSelect } from 'antd'
import React from 'react'
import './inputs.css'

export default function Select({ options = [], className = "", label = "", name = "", placeholder = "", state = null, disabdle = false, required = false, setState = () => { } }) {
    return (
        <div className="form-group">
            {label && <label htmlFor={name}>{label}</label>}
            <AntSelect
                allowClear
                style={{ width: '100%' }}
                options={options}
                className={className}
                name={name}
                id={name}
                placeholder={placeholder}
                disabled={disabdle}
                required={required}
                value={state}
                onChange={(e) => setState(e)}
            />
        </div>
    )
}

import React from 'react'
import './inputs.css'

export default function Radio({ row = false, options = [], name = '', disabled = false, onChange }) {
    return (
        <div className={`radio-input ${row ? 'row' : ''}`}>
            {options?.map((option, index) => (
                <label key={option?.value || index} id={option.value} className={`radio-label ${disabled ? 'disabled' : ''}`}>
                    <input type="radio" className="radio-input" name={name} value={option.value} onChange={(e) => onChange(e.target.value)} disabled={disabled} />
                    <span>{option.label}</span>
                </label>
            ))}
        </div>
    )
}

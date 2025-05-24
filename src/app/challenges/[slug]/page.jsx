import React from 'react'

export default function page({ params: { slug } }) {
    return (
        <div>
            challenges:
            <br />
            {slug}
        </div>
    )
}

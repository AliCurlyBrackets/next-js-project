'use client'

import Script from 'next/script'
import React from 'react'

export default function YoutubeButton() {
    return (
        <>
            <Script src="https://apis.google.com/js/platform.js" />
            <div className="g-ytsubscribe" data-channelid="UCHQ3fhbwgbQP4KHReXE3DfA" data-layout="default" data-count="default"></div>
        </>
    )
}

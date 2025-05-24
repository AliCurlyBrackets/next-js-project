'use client';

import React from 'react'
import { Flex } from 'antd'
import Image from 'next/image'
import facebook from '@/assets/images/icons/facebook.svg'
import instagram from '@/assets/images/icons/instagram.svg'
import youtube from '@/assets/images/icons/youtube.svg'
import facebookRed from '@/assets/images/icons/facebook-red.svg'
import instagramRed from '@/assets/images/icons/instagram-red.svg'
import youtubeRed from '@/assets/images/icons/youtube-red.svg'
import search from '@/assets/images/icons/search.svg'
import './SocialIcons.css'

export default function SocialIcons({ type = 'white-icons', showSearch = false, toggleSearch, setToggleSearch }) {
    const handleToggle = (e) => {
        e.preventDefault();
        setToggleSearch && setToggleSearch(!toggleSearch);
    };

    return (
        <Flex wrap className={`social ${type}`} align='center' gap="middle">
            {showSearch && <a className='search-icon' onClick={(e) => { handleToggle(e) }}><Image src={search} alt="search" /></a> || null}
            <a target="_blank" href="https://www.facebook.com/baytalhikma2.0"><Image src={type == "white-icons" ? facebook : facebookRed} alt="facebook" /></a>
            <a target="_blank" href="https://www.instagram.com/baytalhikma2"><Image src={type == "white-icons" ? instagram : instagramRed} alt="instagram" /></a>
            <a target="_blank" href="https://www.youtube.com/@baytalhikma2"><Image src={type == "white-icons" ? youtube : youtubeRed} alt="youtube" /></a>
        </Flex>
    )
}
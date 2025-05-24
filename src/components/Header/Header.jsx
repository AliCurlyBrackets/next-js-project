'use client';

import React, { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation';
import { Flex } from 'antd';
import Link from 'next/link'
import logo from '@/assets/images/icons/logo.svg'
import closeIcon from '@/assets/images/icons/close.svg'
import Image from 'next/image';
import HeaderSearch from '../Search/HeaderSearch';
import Language from '../Language/Language';
import Container from '../Container/Container';
import MainButton from '../Buttons/MainButton';
import OutlineButton from '../Buttons/OutlineButton';
import NormalButton from '../Buttons/NormalButton';
import Dropdown from '../Dropdown/Dropdown';
import SocialIcons from '../SocialIcons/SocialIcons';
import GoogleTranslate from '../GoogleTranslate/GoogleTranslate';
import './Header.css'

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const [toggle, setToggle] = useState(false);
  const [toggleSearch, setToggleSearch] = useState(false);
  const [mobileView, setMobileView] = useState(false);

  const items = [
    {
      label: <NormalButton path='/challenges' text="كل المبادرات" onClick={() => { router.push(`/challenges`); setToggle(false); }} />,
      key: '0',
    },
    { type: 'divider' },
    {
      label: <NormalButton path='/challenges' text="مشروع مسابقة طالب الجامعة" onClick={() => { router.push(`/challenges/students`); setToggle(false); }} />,
      key: '1',
    },
  ];

  useEffect(() => {
    const layout = document.querySelector('.ant-layout');
    if (toggle) {
      document.body.style.overflow = 'hidden';
      layout && layout?.classList.add('active');
    }
    else {
      document.body.style.overflow = 'auto';
      layout && layout?.classList.remove('active');
    }
    return () => {
      document.body.style.overflow = 'auto';
      layout && layout?.classList.remove('active');
    }
  }, [toggle])

  useEffect(() => {
    if (!window) return
    const handleResize = () => {
      setMobileView(window.innerWidth < 992)
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <Flex wrap className='header' vertical>

      <Flex className="upper-header">

        <Container>

          <Flex wrap justify='space-between' align='center'>

            <Flex wrap className="logo-search" align='center' gap="large">
              <Flex wrap className="logo-menu" align='center' gap="middle">
                <div className="menu" onClick={() => setToggle(true)}>
                  <div className="line"></div>
                  <div className="line"></div>
                  <div className="line"></div>
                </div>
                <Link className='logo' href={`/`}>
                  <Image src={logo} alt="logo" />
                </Link>
              </Flex>
              <HeaderSearch placeholder='ابحث...' toggleSearch={toggleSearch} />
            </Flex>

            <Flex wrap className="social-lang" align='center' gap="middle">
              <div className="lang">
                <GoogleTranslate />
              </div>
              <SocialIcons showSearch={true} toggleSearch={toggleSearch} setToggleSearch={setToggleSearch} />
            </Flex>

          </Flex>

        </Container>

      </Flex>

      <Flex wrap className={`lower-header ${toggle ? 'active' : ''}`}>

        <Container>

          <Flex wrap justify='space-between' align='center' gap="large">

            <button className='close-icon' onClick={() => { setToggle(false) }}><Image src={closeIcon} alt="close" /></button>

            <Flex wrap className="normal-links" gap="large" align='center'>
              <NormalButton path='/' text="الرئيسية" onClick={() => { router.push(`/`); setToggle(false); }} />
              <NormalButton path='/about-project' text="عن المشروع" onClick={() => { router.push(`/about-project`); setToggle(false); }} />
              <NormalButton path='/videos' text="فيديوهات" onClick={() => { router.push(`/videos?page=1&perPage=14&sort=desc&column=published_at&search=&category=`); setToggle(false); }} />
              <NormalButton path='/books' text="كتب" onClick={() => { router.push(`/books?page=1&perPage=16&sort=desc&column=published_at&search=&category=`); setToggle(false); }} />
              <NormalButton path='/magazines' text="مجلات" onClick={() => { router.push(`/magazines?page=1&perPage=16&sort=desc&column=published_at&search=`); setToggle(false); }} />
              <NormalButton path='/articles' text="المدونة" onClick={() => { router.push(`/articles?page=1&perPage=8&sort=desc&column=published_at&search=&category=`); setToggle(false); }} />
              <NormalButton path='/wiki-articles' text="مقالات الويكيبيديا" onClick={() => { router.push(`/wiki-articles?page=1&perPage=16&sort=desc&column=published_at&search=&category=`); setToggle(false); }} />
              <NormalButton path='/podcasts' text="بالعربي" onClick={() => { router.push(`/podcasts?page=1&perPage=8&sort=desc&column=published_at&search=`); setToggle(false); }} />
              {/* <Dropdown text="المبادرات" items={items} path='/challenges' /> */}
            </Flex>

            <Flex wrap className="buttons-links" gap="middle" align='center'>
              <OutlineButton path='/contact-us' text="تواصل معنا" onClick={() => { setToggle(false); }} />
              <MainButton path='/join-us' text="انضم الينا" onClick={() => { setToggle(false); }} />
            </Flex>

            <SocialIcons type='red' showSearch={false} />

          </Flex>

        </Container>

      </Flex>

    </Flex >
  )
}

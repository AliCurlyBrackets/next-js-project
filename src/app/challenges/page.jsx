import React from 'react'
import { Col, Flex, Row } from 'antd';
import ChallengesHero from '@/assets/images/challenges-hero.png';
import SearchIcon from '@/assets/images/icons/search-dark.svg';
import Article1 from '@/assets/images/articles/article-1.png'
import Article2 from '@/assets/images/articles/article-2.png'
import Article3 from '@/assets/images/articles/article-3.png'
import Article4 from '@/assets/images/articles/article-4.png'
import Glasses from '@/assets/images/icons/glasses.svg'
import Container from '@/components/Container/Container';
import Pagination from '@/components/Pagination/Pagination';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Filter from '@/components/Filter/Filter';
import Search from '@/components/Search/Search';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import './page.css'

export default function page() {
    return (
        <>
            <Breadcrumb className='challenges-hero' img={ChallengesHero} bgColor="#EE5A50" title='مشروع مسابقة طالب الجامعة' desc='يطلق مشروع مسابقة طالب الجامعة المترجم للشرق الأوسط وشمال إفريقيا التابع لمشروع بيت الحكمة 2.0 مسابقة لإثراء موسوعة ويكيبيديا' />

            <Container>
                <h1 className='text-center'>المبادرات</h1>
                <br />
                <br />
                <br />
            </Container>
        </>
    )
}

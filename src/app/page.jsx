import React from 'react'
import { Col, Flex, Row } from 'antd';
import { getTeams, initHome } from '@/services/generalServices';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import AboutBG from '@/assets/images/about-bg.png';
import InfoBG from '@/assets/images/info-bg.png';
import SocialIcons from '@/components/SocialIcons/SocialIcons';
import NumbersCard from '@/components/NumbersCard/NumbersCard';
import Book from '@/assets/images/icons/book.svg';
import BookActive from '@/assets/images/icons/book-active.svg';
import Mic from '@/assets/images/icons/mic.svg';
import MicActive from '@/assets/images/icons/mic-active.svg';
import Users from '@/assets/images/icons/users.svg';
import UsersActive from '@/assets/images/icons/users-active.svg';
import News from '@/assets/images/icons/news.svg';
import NewsActive from '@/assets/images/icons/news-active.svg';
import Camera from '@/assets/images/icons/camera.svg';
import CameraActive from '@/assets/images/icons/camera-active.svg';
import Eye from '@/assets/images/icons/eye.svg';
import EyeActive from '@/assets/images/icons/eye-active.svg';
import ArticleIcon from '@/assets/images/icons/tabs/article.svg';
import ArticleActiveIcon from '@/assets/images/icons/tabs/article-active.svg';
import VideoIcon from '@/assets/images/icons/tabs/video-active.svg';
import VideoActiveIcon from '@/assets/images/icons/tabs/video.svg';
import BookIcon from '@/assets/images/icons/tabs/book-active.svg';
import BookActiveIcon from '@/assets/images/icons/tabs/book.svg';
import PodcastIcon from '@/assets/images/icons/tabs/podcast-active.svg';
import PodcastActiveIcon from '@/assets/images/icons/tabs/podcast.svg';
import Adv from '@/assets/images/icons/adv.svg';
import TabsArticles from '@/components/TabsContent/TabsArticles';
import TabsVideos from '@/components/TabsContent/TabsVideos';
import TabsBooks from '@/components/TabsContent/TabsBooks';
import TabsMagazines from '@/components/TabsContent/TabsMagazines';
import TabsPodcasts from '@/components/TabsContent/TabsPodcasts';
import Tabs from '@/components/Tabs/Tabs';
import Quote from '@/components/Quote/Quote';
import OutlineButton from '@/components/Buttons/OutlineButton';
import MainButton from '@/components/Buttons/MainButton';
import Slider from '@/components/Slider/Slider';
import NewsLetter from '@/components/NewsLetter/NewsLetter';
import Vertical from '@/components/TabsContent/Cards/Vertical';
import Partners from '@/components/Partners/Partners';
import Faqs from '@/components/Faqs/Faqs';
import TeamSliderCard from '@/components/Slider/TeamSliderCard';
import HeroSection from './(ClientComponents)/HeroSection';
import EndPoint from '@/services/EndPoint';

export default async function page() {
    const { ImgEndPoint } = EndPoint;
    const { data: homeData } = await initHome();
    const { data: teamData } = await getTeams('paginate=0');
    const achievementAPI = homeData?.find((key) => key?.type == 'achievement')?.data || [];
    const mainCategoriesAPI = homeData?.find((key) => key?.type == 'main_categories')?.data || [];
    const articlesAPI = homeData?.find((key) => key?.type == 'articles')?.data || [];
    const faqsAPI = homeData?.find((key) => key?.type == 'faqs')?.data || [];
    const partnersAPI = homeData?.find((key) => key?.type == 'partners')?.data || [];
    const articles = mainCategoriesAPI?.find((key) => key?.slug == 'articles')?.articles || []
    const videos = mainCategoriesAPI?.find((key) => key?.slug == 'videos')?.videos || []
    const books = mainCategoriesAPI?.find((key) => key?.slug == 'books')?.books || []
    const magazines = mainCategoriesAPI?.find((key) => key?.slug == 'magazines')?.magazines || []
    const podcasts = mainCategoriesAPI?.find((key) => key?.slug == 'podcasts')?.podcasts || []

    const tabs = [
        {
            key: '0',
            label: 'فيديوهات',
            icon: <Image src={VideoIcon} alt="VideoIcon" />,
            activeIcon: <Image src={VideoActiveIcon} alt="VideoActiveIcon" />,
            children: videos?.length ? <TabsVideos videos={videos} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>
        },
        {
            key: '1',
            label: 'كتب',
            icon: <Image src={BookIcon} alt="BookIcon" />,
            activeIcon: <Image src={BookActiveIcon} alt="BookActiveIcon" />,
            children: books?.length ? <TabsBooks books={books} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>
        },
        {
            key: '2',
            label: 'مجلات',
            icon: <Image src={BookIcon} alt="BookIcon" />,
            activeIcon: <Image src={BookActiveIcon} alt="BookActiveIcon" />,
            children: magazines?.length ? <TabsMagazines magazines={magazines} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>
        },
        {
            key: '3',
            label: 'مقالات',
            icon: <Image src={ArticleIcon} alt="ArticleIcon" />,
            activeIcon: <Image src={ArticleActiveIcon} alt="ArticleActiveIcon" />,
            children: articles?.length ? <TabsArticles articles={articles} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>
        },
        {
            key: '4',
            label: 'بودكاست',
            icon: <Image src={PodcastIcon} alt="PodcastIcon" />,
            activeIcon: <Image src={PodcastActiveIcon} alt="PodcastActiveIcon" />,
            children: podcasts?.length ? <TabsPodcasts podcasts={podcasts} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>
        },
    ]

    const achievementImages = [
        Book,
        BookActive,
        Mic,
        MicActive,
        Users,
        UsersActive,
        News,
        NewsActive,
        Camera,
        CameraActive,
        Eye,
        EyeActive,
    ]

    const achievementsList = achievementAPI?.map((achievement, index) => {
        return (
            <Col xs={24} lg={12} xl={7} key={achievement?.id || index}>
                <NumbersCard title={achievement?.title || ""} number={achievement?.count || ""} icon={achievementImages[index * 2]} activeIcon={achievementImages[index * 2 + 1]} />
            </Col>
        )
    })

    const articlesList = articlesAPI?.map((article, index) => {
        return <Vertical key={article?.id || index} id={article?.id || ""} path='articles' title={article?.title || ""} desc={article?.excerpt || ""} img={`${ImgEndPoint}${article?.thumbnails || ""}`} category={article?.category?.name} />
    })

    const teamList = teamData?.map((team, index) => {
        return <TeamSliderCard key={team?.id || index} item={{ img: `${ImgEndPoint}${team?.icon || ""}`, name: team?.name || "", position: team?.bio || "" }} />
    })

    const partnersList = partnersAPI?.map((partner, index) => {
        return <Image key={partner?.id || index} src={`${ImgEndPoint}${partner?.icon || ""}`} alt={partner?.id || "partner"} width='500' height='500' />
    })

    const faqList = faqsAPI?.map((faq) => {
        return {
            key: faq?.id || "",
            label: faq?.question || "",
            children: <p>{faq?.answer || ""}</p>
        }
    })

    return (
        <div>
            <HeroSection />

            <section className='about-section' data-aos="fade-up">
                <Container>
                    <Row gutter={[24, 24]} align={'middle'} justify={'center'} >
                        <Col xs={24} lg={12}>
                            <div className='content'>
                                <h2>
                                   بسم الله
                                    بيت الحكمة الأصليّ كان مركزًا مشعًا للمعرفة والترجمة والدراسة خلال العصر الذهبي للحضارة الإسلامية.
                                     
                                </h2>
                                <p>
                                    لقد كان بيت الحكمة، لل الذي أسسه الخليفة العباسي هارون الرشيد، مركزاً لتلاقي التقاليد الفكرية من مختلف أنحاء الشرق الأوسط وأوروبا.
                                    <br />
                                    <br />
                                    تبادل كبار العلماء المسلمين الأفكار وخلقوا اختراعات غيرت المجتمع بشكل جذري، وترجموا أعمالًا فلسفية عن اليونانيين والفرس والأوروبيين والصينيين والهنود والسومريين. هذه الترجمات عرّضت أجيالاً من العلماء لأفكار خارجية.
                                </p>
                                <h4>
                                    تابعونا على منصات التواصل الاجتماعي
                                </h4>
                                <SocialIcons type="red" />
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Image className='about-img' src={AboutBG} alt='About Background' />
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='numbers-section' data-aos="fade-up">
                <Container>
                    <Row gutter={[24, 24]} align={'middle'}>

                        <Col xs={24} lg={8}>
                            <div className='content line'>
                                <h2>
                                    انجازات بيت الحكمة
                                </h2>
                                <p>
                                    نفخر ونسعد بتقديم وإنتاج أشكال متنوعة من المحتوى الهادف لتحقيق هدفنا السامي المتمثّل بإتاحة غير المتاح وإثراء المعارف البشريّة
                                </p>
                            </div>
                        </Col>

                        <Col xs={24} lg={16}>
                            <Row gutter={[24, 24]}>
                                <Col lg={0} xl={3}></Col>

                                {achievementsList}

                                <Col lg={0} xl={3}></Col>
                            </Row>
                        </Col>

                    </Row>
                </Container>
            </section>

            <section className='info-section' data-aos="fade-up">
                <Container>
                    <Row gutter={[24, 24]}>

                        <Col xs={24} lg={12} >
                            <div className='content'>
                                <h2>
                                    بيت الحكمة واحد من مشاريع مؤسسة أفكار بلا حدود  Ideas Beyond Borders (IBB)
                                </h2>
                                <p>
                                    يهدف إلى نشر المعرفة في مجالات متعددة وبأكثر من لغة، منها العربية، والكرديّة، والباشتوية، والفارسية. سُمي المشروع تيمنًا ببيت الحكمة، المركز الثقافي والعلمي الذي أسس خلال العصر الذهبي للدولة العباسية، ويعتبر نسخة حديثة من مكتبة بغداد العظيمة التي كانت مركزًا للفكر والترجمة.
                                    <br />
                                    <br />
                                    تهدف مؤسسة أفكار بلا حدود المشغلة والمالكة للمشروع إلى إتاحة المعارف من خلال تقديم محتوى مترجمًا وأصليًا في موضوعات متعددة، أبرزها الاقتصاد، والعلوم، والحقوق المدنية، والعقلانية. تشجع المؤسسة جمهورها على التفكير النقدي والتحليلي، وتمول مشاريع إبداعية ومبادرات متوافقة مع قيمها.
                                </p>
                            </div>

                            <div className='content'>
                                <h2>
                                    انطلق المشروع عام 2018، ومنذ ذلك الحين حتى اليوم ما زال يقدم المحتوى بأشكال عدّة:</h2>
                                <p>
                                    الفيديوهات، والمقالات الأصلية، والمجلات، ومقالات عبر موسوعة ويكيبيديا، وكذلك منشورات عبر صفحات المشروع على وسائل التواصل الاجتماعي. في يونيو 2024، وبعد قُرابة 5 سنوات من إطلاق المشروع، حصدت جميع المقالات والفيديوهات والمنشورات التي أنتجها المشروع أكثر من مليار مشاهدة وقراءة، ما يؤكد على شعبية المشروع وأهميته، وقدرته الكبيرة على نشر المعرفة وإتاحتها للجميع.
                                </p>
                            </div>
                        </Col>

                        <Col xs={24} lg={12}>
                            <Image className='info-img' src={InfoBG} alt="info-img" />
                        </Col>

                    </Row>
                </Container>
            </section>

            <section className='team-section' data-aos="fade-up">
                <Container>
                    <div className="content line">
                        <h2 className='text-center'>فريق بيت الحكمة</h2>
                    </div>
                </Container>
                <Container>
                    {teamList?.length ? <Slider items={teamList} className='team-slider' centeredSlides={true} slidesPerView={3} spaceBetween={75} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
                </Container>
            </section>

            <section className='categories-section' data-aos="fade-up">
                <Container>
                    <div className="content">
                        <h2>أقسام الموقع</h2>
                    </div>
                    <Tabs
                        className='categories-tabs'
                        items={tabs}
                    />
                </Container>
            </section>

            <section className='quote-section' data-aos="fade-up">
                <Container>
                    <Row gutter={[24, 24]} align={'middle'} justify={'center'} >
                        <Col xs={24} lg={24}>
                            <Quote img={Adv} bgColor={'#F3766E'} raduis={12}>
                                <div className='quote-content'>
                                    <h2>نريد أن نعيد لمنطقتنا مجدها السابق. أتريد ذلك أيضاً؟</h2>
                                    <p>
                                        خلال العصر الذهبي، ساهمت منطقتنا ببعض أكبر الاختراعات والعجائب العلمية في العالم الحديث. نحن نعيد إيقاد روح المعرفة والمجد والأمل التي ألهمت المنطقة خلال هذه الفترة، ونحن بحاجة إليك.
                                    </p>
                                    <Flex className='quote-buttons' align='middle' gap='middle'>
                                        <MainButton path='contact-us' className='border-white bg-white text-main' text='تواصل معنا' />
                                        <OutlineButton path='join-us' className='border-white text-white' text='انضم الينا' />
                                    </Flex>
                                </div>
                            </Quote>
                        </Col>
                    </Row>
                </Container>
            </section>

            <section className='articles-section' data-aos="fade-up">
                <Container>
                    <div className="content">
                        <h2 className='text-center'>مدونة بيت الحكمة</h2>
                    </div>
                </Container>
                <Container>
                    {articlesList?.length ? <Slider items={articlesList} className='articles-slider' centeredSlides={true} slidesPerView={3} spaceBetween={75} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
                </Container>
            </section>

            <section className='newsletter-section' data-aos="fade-up">
                <Container>
                    <NewsLetter />
                </Container>
            </section>

            <section className='faqs-section' data-aos="fade-up">
                {faqList?.length ? <Faqs faqList={faqList} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
            </section>

            <section className='partners-section' data-aos="fade-up">
                {partnersList?.length ? <Partners partnersList={partnersList} /> : <h2 className='no-result'>لا يوجد بيانات حاليا</h2>}
            </section>
        </div >
    )
}

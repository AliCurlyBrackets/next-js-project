import React from 'react'
import { Col, Row } from 'antd';
import { getTeams, initHome } from '@/services/generalServices';
import Container from '@/components/Container/Container';
import Image from 'next/image';
import InfoBG from '@/assets/images/info-bg.png';
import NumbersCard from '@/components/NumbersCard/NumbersCard';
import PartnersHero from '@/assets/images/about-partners.png';
import AboutProjectHero from '@/assets/images/about-project-hero.png';
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
import Slider from '@/components/Slider/Slider';
import Partners from '@/components/Partners/Partners';
import Faqs from '@/components/Faqs/Faqs';
import TeamSliderCard from '@/components/Slider/TeamSliderCard';
import EndPoint from '@/services/EndPoint';
import Breadcrumb from '@/components/Breadcrumb/Breadcrumb';
import ContactUs from '@/components/ContactUs/ContactUs';
import Quote from '@/components/Quote/Quote';
import AboutPageL from '@/assets/images/icons/about-page-l.png';
import AboutPageR from '@/assets/images/icons/about-page-r.png';
import './page.css'

export default async function page() {
    const { ImgEndPoint } = EndPoint;
    const { data: homeData } = await initHome();
    const { data: teamData } = await getTeams('paginate=0');
    const achievementAPI = homeData?.find((key) => key?.type == 'achievement')?.data || [];
    const faqsAPI = homeData?.find((key) => key?.type == 'faqs')?.data || [];
    const partnersAPI = homeData?.find((key) => key?.type == 'partners')?.data || [];

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

    const teamList = teamData?.map((team, i) => {
        return <TeamSliderCard key={team?.id || i} item={{ img: `${ImgEndPoint}${team?.icon || ""}`, name: team?.name || "", position: team?.bio || "" }} />
    })

    const partnersList = partnersAPI?.map((partner, i) => {
        return <Image key={partner?.id || i} src={`${ImgEndPoint}${partner?.icon || ""}`} alt={partner?.id || "partner"} width='500' height='500' />
    })

    const faqList = faqsAPI?.map((faq) => {
        return {
            key: faq?.id || "",
            label: faq?.question || "",
            children: <p>{faq?.answer || ""}</p>
        }
    })

    return (
        <div className='about-project-page'>
            <title>عن المشروع - بيت الحكمة</title>
            {/* <meta name="description" content="عن المشروع - بيت الحكمة" /> */}

            <Breadcrumb className='about-project-hero' img={AboutProjectHero} bgColor="#1F2857" title='عن المشروع' desc='بيت الحكمة الأصليّ كان مركزا مشعا للمعرفة والترجمة والدراسة خلال العصر الذهبي للإسلام.' />

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

            {/* <section className='img-section' data-aos="fade-up" style={{ backgroundImage: `url(${PartnersHero.src})` }} ></section> */}

            <Container>
                <Quote imgL={AboutPageL} imgR={AboutPageR} bgColor={'#f1f5fd'}>
                    <div className='quote-content'>
                        <h2>“ان ايماننا بالحرية لا يركز على النتائج المتوقعة في ظروف معينة، بل علي الاعتقاد بأنها ستحرر المزيد من القوى من اجل الخير اكثر من الشر”</h2>
                        <p>فريدريش فون هايك</p>
                    </div>
                </Quote>
            </Container>

            <section className='team-section' data-aos="fade-up">
                <Container>
                    <div className="content line">
                        <h2 className='text-center'>فريق بيت الحكمة</h2>
                    </div>
                </Container>
                <Container>
                    <Slider items={teamList} className='team-slider' centeredSlides={true} slidesPerView={3} spaceBetween={75} />
                </Container>
            </section>

            <section className='faqs-section' data-aos="fade-up">
                <Faqs faqList={faqList} />
            </section>

            <section className='partners-section' data-aos="fade-up">
                <Container>
                    {partnersList.length > 0 ? <Partners partnersList={partnersList} /> : <h2 className='no-result'>لا يوجد شركاء حاليا</h2>}
                </Container>
            </section>

            <ContactUs />
        </div>
    )
}
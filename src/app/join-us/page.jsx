import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import Container from "@/components/Container/Container";
import JoinUs from "@/components/JoinUs/JoinUs";
import JoinHero from "@/assets/images/join-hero.png";

export default function page() {

    return (
        <section className='join-section' data-aos="fade-up">
            <title>انضم الينا - بيت الحكمة</title>
            {/* <meta name="description" content="انضم الينا - بيت الحكمة" /> */}

            <Breadcrumb className='join-hero' img={JoinHero} bgColor="#1f2857" title='انضم الينا' />
            <Container>
                <JoinUs />
            </Container>
        </section>
    )
}

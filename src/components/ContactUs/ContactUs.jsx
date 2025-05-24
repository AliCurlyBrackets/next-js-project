'use client'

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { createContact, getContactReasons, getCountries } from '@/services/generalServices'
import Email from '@/assets/images/icons/email.svg'
import NormalButton from '@/components/Buttons/NormalButton'
import Container from '@/components/Container/Container'
import Select from '@/components/Inputs/Select'
import Text from '@/components/Inputs/Text'
import Textarea from '@/components/Inputs/Textarea'
import MainButton from '@/components/Buttons/MainButton'
import sweetAlert from '@/helpers/sweetAlert'
import './ContactUs.css'

export default function ContactUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [mobile, setMobile] = useState('')
  const [reason, setReason] = useState(null)
  const [country, setCountry] = useState(null)
  const [message, setMessage] = useState('')
  const [contactReasons, setContactReasons] = useState([])
  const [countries, setCountries] = useState([])

  const handleReset = () => {
    setName('')
    setEmail('')
    setMobile('')
    setReason(null)
    setCountry(null)
    setMessage('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !mobile || !country || !reason || !message) {
      sweetAlert.error("الرجاء ملء جميع الحقول")
      return;
    }

    const countryCode = countries?.find(item => item.value == country)?.code;
    let formData = {
      name,
      email,
      mobile: `${countryCode || ""}${mobile}`,
      contact_reason_id: reason,
      message
    }

    try {
      const { data } = await createContact(formData);
      sweetAlert.success("تم إرسال رسالتك بنجاح");
      handleReset();
    } catch (error) {
      console.log('error:', error)
      sweetAlert.error("حدث خطأ ما، يرجى المحاولة مرة أخرى");
    }
  };

  const getContactReasonsHandler = async () => {
    try {
      const { data } = await getContactReasons(`paginate=0`);
      let items = data?.map((item, index) => ({
        value: item.id,
        label: item.title
      }));
      setContactReasons(items);
    } catch (error) {
      console.log('error:', error)
    }
  }

  const getCountriesHandler = async () => {
    try {
      const { data } = await getCountries(`paginate=0`);
      let items = data?.map((item) => ({
        value: item.id,
        label: item.title,
        code: item.code
      }));
      setCountries(items);
    } catch (error) {
      console.log('error:', error)
    }
  }

  useEffect(() => {
    getContactReasonsHandler();
    getCountriesHandler();
  }, [])

  return (
    <section className='contact-section' data-aos="fade-up">
      <Container>
        <Row gutter={[24, 24]} align={'middle'} justify={'center'}>


          <Col xs={24} lg={12}>
            <div className='content'>
              <h2>تواصل معنا، إن اقتراحاتك وأرائك مهمة بالنسبة إلينا!</h2>
              <p>هل لديك سؤال؟ لا تتردد في الاتصال بنا</p>
              <NormalButton className='email-btn' text='hello@baytalhikma.org' icon={Email} onClick={() => window.open('mailto:hello@baytalhikma.org', '_blank')} />
            </div>
          </Col>

          <Col xs={24} lg={12}>
            <Text
              label="الاسم"
              name="name"
              placeholder='اسمك...'
              state={name}
              setState={setName}
            />
            <br />
            <Text
              label="البريد الإلكتروني"
              name="email"
              placeholder='بريدك الالكتروني...'
              state={email}
              setState={setEmail}
            />
            <br />
            <Select
              label="الدولة"
              name="country"
              placeholder='اختر الدولة...'
              state={country}
              setState={setCountry}
              options={countries}
            />
            <br />
            <Text
              label="الهاتف المحمول"
              name="mobile"
              placeholder='رقم الهاتف...'
              state={mobile}
              setState={setMobile}
            />
            <br />
            <Select
              label="سبب التواصل"
              name="reason"
              placeholder='سبب التواصل...'
              state={reason}
              setState={setReason}
              options={contactReasons}
            />
            <br />
            <Textarea
              label="رسالتك"
              name="message"
              placeholder='اترك لنا رسالتك...'
              state={message}
              setState={setMessage}
            />
            <br />
            <MainButton text='تواصل معنا' className='second-btn' onClick={handleSubmit} />
          </Col>

        </Row>
      </Container>
    </section>
  )
}

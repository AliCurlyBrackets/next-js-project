'use client'

import React, { useEffect, useState } from 'react'
import { Col, Row } from 'antd'
import { createJoin, getCountries } from '@/services/generalServices'
import Select from '@/components/Inputs/Select'
import Text from '@/components/Inputs/Text'
import Textarea from '@/components/Inputs/Textarea'
import Radio from '../Inputs/Radio'
import MainButton from '@/components/Buttons/MainButton'
import sweetAlert from '@/helpers/sweetAlert'
import './JoinUs.css'

export default function JoinUs() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [job, setJob] = useState('')
  const [rate, setRate] = useState('')
  const [country, setCountry] = useState(null)
  const [message, setMessage] = useState('')
  const [countries, setCountries] = useState([])

  const options = [
    {
      label: 'ممتاز',
      value: 'ممتاز'
    },
    {
      label: 'جيد',
      value: 'جيد'
    },
    {
      label: 'مخيّب',
      value: 'مخيّب'
    }
  ];

  const handleReset = () => {
    setName('');
    setEmail('');
    setJob(null);
    setCountry(null);
    setRate(null);
    setMessage('');
  };

  const handleSubmit = async () => {
    if (!name || !email || !job || !country || !rate || !message) {
      sweetAlert.error("الرجاء ملء جميع الحقول")
      return;
    }

    let formData = {
      name,
      email,
      job,
      country_id: country,
      rating: rate,
      your_story: message,
    }

    try {
      const { data } = await createJoin(formData);
      sweetAlert.success("تم إرسال طلبك بنجاح");
      handleReset();
    } catch (error) {
      console.log('error:', error)
      sweetAlert.error("حدث خطأ ما، يرجى المحاولة مرة أخرى");
    }
  };

  const getCountriesHandler = async () => {
    try {
      const { data } = await getCountries(`paginate=0`);
      let items = data?.map((item) => ({ value: item.id, label: item.title }));
      setCountries(items);
    } catch (error) {
      console.log('error:', error)
    }
  }

  useEffect(() => {
    getCountriesHandler();
  }, [])

  return (
    <Row gutter={[24, 24]} align={'middle'} justify={'center'}>

      <Col xs={24} lg={12}>
        <div className='content'>
          <h2>
            انضم إلى الحركة اليوم!
          </h2>
          <p>
            نريد أن نعيد لمنطقتنا مجدها السابق. أتريد ذلك أيضاً
          </p>
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

        <Row gutter={[12, 12]}>
          <Col xs={24} lg={12}>
            <Text
              label="العمل/الوظيفة"
              name="job"
              placeholder='اكتب وظيفتك...'
              state={job}
              setState={setJob}
            />
          </Col>
          <Col xs={24} lg={12}>
            <Select
              label="الدولة"
              name="country"
              placeholder='اختر الدولة...'
              state={country}
              setState={setCountry}
              options={countries}
            />
          </Col>
        </Row>
        <br />

        <>
          <div className="form-group">
            <label className='m-0'>
              تقييمك لموقع بيت الحكمة
            </label>
          </div>
          <Radio row={true} options={options} name="rate" state={rate} onChange={setRate} />
        </>

        <Textarea
          label="اخبرنا قصتك"
          name="message"
          placeholder='اترك لنا رسالتك...'
          state={message}
          setState={setMessage}
        />
        <br />

        <MainButton text='انضم الان' className='second-btn' onClick={handleSubmit} />
      </Col>

    </Row>
  )
}

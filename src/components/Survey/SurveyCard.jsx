'use client'
import React, { useState } from 'react'
import { createVote } from '@/services/generalServices'
import Radio from '@/components/Inputs/Radio'
import sweetAlert from '@/helpers/sweetAlert'

export default function SurveyCard({ question = '', answers = [], setDisabled }) {
    const [disabledRadio, setDisabledRadio] = useState(false);

    const handleSubmit = async (answerId) => {
        try {
            await createVote(answerId);
            setDisabledRadio(true);
            setDisabled(false);
            sweetAlert.success('تم التصويت بنجاح');
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <p>{question}</p>
            <Radio name={question || ''} options={answers} onChange={handleSubmit} disabled={disabledRadio} />
        </>
    )
}

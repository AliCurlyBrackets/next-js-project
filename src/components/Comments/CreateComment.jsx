'use client'

import React, { useState } from 'react'
import { CustomCreateComment } from '@/services/generalServices'
import NormalButton from '../Buttons/NormalButton'
import Text from '../Inputs/Text'
import sweetAlert from '@/helpers/sweetAlert'
import './Comments.css'

export default function CreateComment({ id = '', name = '' }) {
    const [comment, setComment] = useState('');
    const [author, setAuthor] = useState('');
    const [addedComment, setAddedComment] = useState(false);

    const handleReset = () => {
        setComment('');
        setTimeout(() => {
            setAddedComment(false);
        }, 20000);
    };

    const handleCreateComment = async () => {
        if (!author) {
            sweetAlert.error('الرجاء ادخال اسمك');
            return;
        }

        if (!comment) {
            sweetAlert.error('الرجاء ادخال تعليق');
            return;
        }

        try {
            await CustomCreateComment(id, name, { author, text: comment });
            setAddedComment(true);
            handleReset();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Text placeholder='اسمك' name='author' state={author} setState={setAuthor} />
            <div className="comment-create">
                <div className="input-button-custom">
                    <Text placeholder='اضف تعليقكك...' name='comment' state={comment} setState={setComment} />
                    <NormalButton text='تعليق' onClick={handleCreateComment} />
                </div>
            </div>
            {addedComment && <p className="comment-added">تم اضافة تعليقك بنجاح، سيتم مراجعته ونشره قريباً</p>}
        </>
    )
}

import React from 'react'
import { arabicDate } from '@/helpers/arabicDate'
import ViewComment from './ViewComment'
import CreateComment from './CreateComment'
import './Comments.css'

export default function Comment({ comments = [], id = '', name = '', createComment = true }) {

    return (
        <div className='comments-section'>
            <h4>التعليقات</h4>

            {createComment && <CreateComment id={id} name={name} />}

            <div className="comments-card">
                {comments?.find((item) => item.approved) ? comments?.map((comment, index) => comment?.approved && <ViewComment key={comment?.id || index} right={true} name={comment?.author || ''} comment={comment?.text || ''} date={arabicDate(comment?.published_at || '')} />) : <h2 className='no-result'>لا يوجد تعليقات</h2>}
            </div>
        </div>
    )
}

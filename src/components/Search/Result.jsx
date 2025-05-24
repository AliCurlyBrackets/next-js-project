import React from 'react'
import Image from 'next/image';
import Close from '@/assets/images/icons/close.svg';
import Horizontal from '../TabsContent/Cards/Horizontal';
import Glasses from '@/assets/images/icons/glasses.svg';
import BookWhite from '@/assets/images/icons/book-white.svg'
import Play from '@/assets/images/icons/play.svg';
import Mic from '@/assets/images/icons/mic.svg';
import EndPoint from '@/services/EndPoint';
import './Search.css'

export default function Result({ result, setSearch }) {
  const { ImgEndPoint } = EndPoint;

  const handleNoResult = () => {
    if (result?.map((item) => item?.data?.length)?.filter((item) => item == 0)?.length == result?.length) {
      return <li key='no-result'>لا توجد نتائج</li>;
    }
  }

  const handleResult = (results) => {
    if (!results) {
      return <li>لا توجد نتائج</li>;
    }

    return results.map((result, index) => {
      return result?.data?.length && (
        <li key={result?.title || index}>
          <h2>
            {result?.title}
          </h2>
          <ul>
            {result?.data.map((item, index) => {
              return (
                <li key={item.id || index}>
                  <Horizontal
                    id={item.id || ""}
                    path={result?.type || ""}
                    img={item?.thumbnails ? item?.thumbnails?.includes('http') ? item?.thumbnails : `${ImgEndPoint}${item?.thumbnails || ""}` : ""}
                    title={item.title || ""}
                    hoverImage={result?.type == 'articles' ? Glasses : result?.type == 'books' ? BookWhite : result?.type == 'magazines' ? BookWhite : result?.type == 'videos' ? Play : result?.type == 'podcasts' ? Mic : ""}
                    hoverImageText={result?.type == 'articles' ? 'قراءة المقال' : result?.type == 'books' ? 'قراءة الكتاب' : result?.type == 'magazines' ? 'قراءة المجلة' : result?.type == 'videos' ? null : result?.type == 'podcasts' ? 'استماع البودكاست' : ""}
                  />
                </li>
              );
            })}
          </ul>
        </li>
      ) || null;
    });
  }

  return result ? (
    <div className="search-result">
      <Image className='close' src={Close} alt="close" onClick={() => setSearch('')} />
      <ul>
        {handleNoResult()}
        {handleResult(result)}
      </ul>
    </div>
  ) : null;
}

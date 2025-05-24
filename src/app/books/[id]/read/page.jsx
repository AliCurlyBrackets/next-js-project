import React from 'react'
import { getBook } from '@/services/generalServices';
import PDFViewer from 'src/components/PdfViewer/PdfViewer'
import EndPoint from '@/services/EndPoint';

export default async function page({ params: { id } }) {
    const { ImgEndPoint } = EndPoint;
    const { data: bookData } = await getBook(id);
    const url = bookData?.pdf ? `${ImgEndPoint}${bookData?.pdf}` : '';

    return (
        <div className='book-read-page'>
            <title>{bookData?.title || ""}</title>
            <meta name="description" content={bookData?.excerpt || ""} />
            
            <PDFViewer pdfUrl={url} driveUrl={bookData?.drive_link} />
        </div>
    )
}

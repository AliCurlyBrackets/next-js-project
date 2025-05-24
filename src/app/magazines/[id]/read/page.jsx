import React from 'react'
import { getMagazine } from '@/services/generalServices';
import PDFViewer from 'src/components/PdfViewer/PdfViewer'
import EndPoint from '@/services/EndPoint';

export default async function page({ params: { id } }) {
    const { ImgEndPoint } = EndPoint;
    const { data: magazineData } = await getMagazine(id);
    const url = magazineData?.pdf ? `${ImgEndPoint}${magazineData?.pdf}` : '';

    return (
        <div className='book-read-page'>
            <title>{magazineData?.title || ""}</title>
            <meta name="description" content={magazineData?.title || ""} />

            <PDFViewer pdfUrl={url} />
        </div>
    )
}

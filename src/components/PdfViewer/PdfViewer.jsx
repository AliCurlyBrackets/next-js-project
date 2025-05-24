'use client';

import React, { useRef, useEffect } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import { Flex } from 'antd';
import { isMobile } from 'react-device-detect';
import Container from '../Container/Container';
import DownloadIcon from '@/assets/images/icons/file-download.svg';
import FullScreenIcon from '@/assets/images/icons/expand.svg';
import ShareIcon from '@/assets/images/icons/share.svg';
import Edit from '@/assets/images/icons/edit.svg';
import OutlineButton from '../Buttons/OutlineButton';
import NormalButton from '../Buttons/NormalButton';
import Dropdown from '../Dropdown/Dropdown';
import MenuDots from '@/assets/images/icons/menu-dots.svg';
import Image from 'next/image';
import BackButton from '../Buttons/BackButton';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import './PDFViewer.css';

const PDFViewer = ({ pdfUrl = '', driveUrl = '' }) => {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();
  const viewerRef = useRef(null);

  const toggleFullScreen = () => {
    if (viewerRef.current && viewerRef.current.requestFullscreen) {
      viewerRef.current.requestFullscreen().catch(err => {
        alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else if (viewerRef.current.webkitRequestFullscreen) {
      viewerRef.current.webkitRequestFullscreen();
    } else {
      alert('Full-screen mode is not supported in this browser.');
    }
  };

  const downloadPDF = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const sharePDF = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, text: 'Check out this PDF', url: pdfUrl }).then(() => console.log('Successful share')).catch((error) => console.log('Error sharing:', error));
    } else {
      alert('Web Share API is not supported in your browser.');
    }
  }

  const suggestTranslation = () => {
    window.open(driveUrl, '_blank');
  }

  const items = [
    {
      key: '0',
      label: <NormalButton onClick={downloadPDF} text='تحميل' />,
      icon: <Image src={DownloadIcon} alt="download" />,
    },
    {
      key: '1',
      label: <NormalButton onClick={sharePDF} text='مشاركة' />,
      icon: <Image src={ShareIcon} alt="share" />,
    },
    {
      key: '2',
      label: <NormalButton onClick={toggleFullScreen} text='عرض كامل' />,
      icon: <Image src={FullScreenIcon} alt="full-screen" />,
    },
    driveUrl && {
      key: '5',
      label: <NormalButton onClick={suggestTranslation} text='اقتراح تعديل ترجمة' />,
      icon: <Image src={Edit} alt="edit" />,
    }
  ]

  return (
    <div className="pdf-viewer-page">
      <div className="pdf-viewer-container">
        <div ref={viewerRef} className="pdf-viewer">
          <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
            <Viewer
              key={pdfUrl}
              fileUrl={pdfUrl}
              defaultScale={isMobile ? 0.5 : 1.0}
              viewMode={isMobile ? 'SinglePage' : 'DualPage'}
              plugins={[defaultLayoutPluginInstance]}
            />
          </Worker>
        </div>
        <Flex className="pdf-controls">
          <Container>
            <Flex wrap gap="middle" align='center' justify='space-between' className='pdf-controls-wrapper'>

              <Flex gap="middle" align='center' className='pdf-controls-right'>
                <NormalButton icon={DownloadIcon} onClick={downloadPDF} />
                <NormalButton icon={ShareIcon} onClick={sharePDF} />
                <NormalButton icon={FullScreenIcon} onClick={toggleFullScreen} />
              </Flex>

              <Flex gap="middle" align='center' className='pdf-controls-center'>
                <Dropdown icon={MenuDots} arrow={false} items={items} />
              </Flex>

              <Flex gap="middle" align='center' className='pdf-controls-left'>
                <BackButton text='العودة' />
                {driveUrl && <OutlineButton text='اقتراح تعديل ترجمة' icon={Edit} onClick={suggestTranslation} /> || ""}
              </Flex>

            </Flex>
          </Container>
        </Flex>
      </div>
    </div>
  );
};

export default PDFViewer; 
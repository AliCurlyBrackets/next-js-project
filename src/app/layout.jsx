import React from 'react';
import { Layout } from 'antd';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import { GoogleTagManager } from '@next/third-parties/google'
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';
import AosConfig from './AosConfig.jsx';
import Script from 'next/script.js';
import './globals.css';

const RootLayout = ({ children }) => (
  <html lang="ar">
    <head>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#000000" />

      <title>الصفحة الرئيسية - بيت الحكمة</title>

      <meta name="description" content="بيت الحكمة 2.0 مشروع يهدف إلى إعادة العصر الذهبي للعلوم العربية والاسلامية وجعل غير المتاح متاحًا!" />
      <meta name="keywords" content="بيت الحكمة, العصر الذهبي للإسلام, الثقافة العربية, التوعية الثقافية, الفكر العربي, ترجمة الكتب, التاريخ الإسلامي, النهضة الفكرية, الفلسفة العربية, الأدب العربي, التعليم في الإسلام, مقالات ثقافية, بودكاست عربي, كتب عربية, مجلات ثقافية, فيديوهات تثقيفية, التنمية الثقافية, الوعي الثقافي, العالم العربي, مركز المعرفة" />
      <meta name="author" content="Apollo Solutions" />
      <meta property="og:image" itemProp="image" content="/favicon.svg" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="بيت الحكمة" />
      <meta property="og:image:type" content="image/svg" />
      <meta property="og:image:secure_url" content="/favicon.svg" />
      <meta property="og:image:url" content="/favicon.svg" />

      <meta property="og:locale" content="ar_AR" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content="الصفحة الرئيسية - بيت الحكمة" />
      <meta property="og:description" content="بيت الحكمة 2.0 مشروع يهدف إلى إعادة العصر الذهبي للعلوم العربية والاسلامية وجعل غير المتاح متاحًا!" />
      <meta property="og:url" content="https://www.baytalhikma2.org/" />
      <meta property="og:site_name" content="بيت الحكمة" />
      <meta property="article:modified_time" content="2024-08-10T10:52:37+00:00" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="generator" content="Next.js" />
      <meta name="generator" content="React.js" />
      <meta name="generator" content="Node.js" />
      <meta name="generator" content="PHP" />
      <meta name="generator" content="Laravel" />
      <meta name="generator" content="MySQL" />

      <link rel="shortcut icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="72x72" href="/favicon.svg" />
      <link rel="apple-touch-icon" sizes="114x114" href="/favicon.svg" />

      <link rel="canonical" href="https://www.baytalhikma2.org/" />
      <link rel="alternate" hrefLang="ar" href="https://www.baytalhikma2.org/" />
      <link rel="shortlink" href="https://www.baytalhikma2.org/" />

      {/* <meta name="google-site-verification" content="nLeIr8TSnhIDoX9R4H3gQNQs76d99SmikCI-eQH97So" /> */}

      {/* <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','G-S83441LXQJ');`,
        }}
      /> */}
    </head>
    <body>
      {/* <noscript>
        <iframe
          src="https://www.googletagmanager.com/ns.html?id=G-S83441LXQJ"
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        ></iframe>
      </noscript> */}

      <Script id="google-tag-manager-script" strategy="afterInteractive" async src="https://www.googletagmanager.com/gtag/js?id=G-MKMDGQS139"></Script>
      <Script id="google-tag-manager" strategy="afterInteractive">
        {
          `
          if (typeof window !== 'undefined') {
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments)}
              gtag('js', new Date());
              gtag('config', 'G-MKMDGQS139');
              console.log('Google Tag Manager is loaded');
          }
          `
        }
      </Script>
      <Script id="clarity-script" strategy="afterInteractive">
        {
          `
          (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "MKMDGQS139");
          `
        }
      </Script>

      <AosConfig />
      <Layout>
        <Header />
        <AntdRegistry>
          {children}
        </AntdRegistry>
        <Footer />
      </Layout>
    </body>
  </html>
);

export default RootLayout;
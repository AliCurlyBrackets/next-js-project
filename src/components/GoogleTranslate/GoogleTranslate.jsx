'use client';

import React, { useEffect } from 'react';
import './GoogleTranslate.css';

const GoogleTranslate = () => {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const addGoogleTranslateScript = () => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
                script.async = true;
                document.body.appendChild(script);

                window.googleTranslateElementInit = () => {
                    new window.google.translate.TranslateElement(
                        {
                            pageLanguage: 'ar',
                            includedLanguages: 'en',
                            layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
                            multilanguagePage: true,
                            autoDisplay: false,
                        },
                        'google_translate_element'
                    );

                    // Function to add "Back to Original" option
                    const addBackToOriginalOption = () => {
                        const translateMenu = document.querySelector('.goog-te-combo');
                        if (translateMenu && !document.querySelector('option[value="original"]')) {
                            const option = document.createElement('option');
                            option.textContent = 'العربية';
                            option.value = 'original';
                            translateMenu.appendChild(option);

                            translateMenu.addEventListener('change', (e) => {
                                if (e.target.value === 'original') {
                                    // Reset to original content
                                    document.querySelector('html').removeAttribute('class');
                                    document.querySelectorAll('.goog-te-banner-frame').forEach(el => el.style.display = 'none');
                                    document.querySelectorAll('.goog-te-menu-frame').forEach(el => el.style.display = 'none');
                                    window.location.reload(); 
                                }
                            });
                        }
                    };

                    // Add observer to detect changes in the translate menu
                    const observer = new MutationObserver(() => {
                        addBackToOriginalOption(); // Ensure "Back to Original" option is always added
                    });

                    observer.observe(document.body, {
                        childList: true,
                        subtree: true,
                    });

                    // Initial call to add the option when the dropdown is first created
                    setTimeout(addBackToOriginalOption, 1000);
                };

                // Cleanup on unmount
                return () => {
                    document.body.removeChild(script);
                };
            };

            addGoogleTranslateScript();
        }
    }, []);

    return <div id="google_translate_element"></div>;
};

export default GoogleTranslate;

'use client'

import React, { useEffect, useState } from 'react'
import { getPoll } from '@/services/generalServices'
import NormalButton from '../Buttons/NormalButton'
import Arrow from '@/assets/images/icons/arrow-left.svg'
import ThankYou from '@/assets/images/icons/thanks.svg'
import SurveyCard from './SurveyCard'
import PollsTabs from '../Tabs/PollsTabs'
import Image from 'next/image'
import './Survey.css'

export default function Survey({ polls }) {
    const [activePollIndex, setActivePollIndex] = useState(0);
    const [pollsVisibility, setPollsVisibility] = useState(
        Array(polls.length).fill(false).map((_, index) => index === 0)
    );

    if (!polls?.length) return null;

    const handlePollCompletion = () => {
        console.log('Poll completed', activePollIndex);
        setTimeout(() => {
            setActivePollIndex(prevIndex => prevIndex + 1);
            setPollsVisibility(prevVisibility =>
                prevVisibility.map((visible, index) => index === activePollIndex + 1)
            );
        }, 5000);
    };

    return (
        <div className="survey-container">
            {polls.map((poll, index) => (
                <PollSection
                    key={poll.id || index}
                    poll={poll}
                    isActive={pollsVisibility[index]}
                    onPollComplete={handlePollCompletion}
                />
            ))}
        </div>
    );
}

function PollSection({ poll, isActive, onPollComplete }) {
    const [activeTab, setActiveTab] = useState(1);
    const [pollData, setPollData] = useState(null);
    const [items, setItems] = useState([]);
    const [disabled, setDisabled] = useState(true);

    const getPollHandler = async (poll) => {
        try {
            const { data } = await getPoll(poll.id);
            setPollData(data);

            const tabsItems = data?.questions?.map((question, index) => ({
                key: parseInt(index) + 1,
                children: <SurveyCard question={question?.title || ''} answers={question?.answers?.map(answer => ({ label: answer?.title, value: answer?.id }))} setDisabled={setDisabled} />
            }));

            tabsItems?.push({
                key: tabsItems?.length + 1,
                children: <div className='thanks-card'>
                    <Image src={ThankYou} alt="Thank you" />
                    <h2>تم ملء الاستبيان بنجاح</h2>
                    <p>شكراً لك على ملء الاستبيان.</p>
                </div>
            });

            setItems(tabsItems);
            setActiveTab(1);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getPollHandler(poll);

        return () => {
            setPollData(null);
            setItems([]);
            setActiveTab(1);
            setDisabled(true);
        }
    }, [poll]);

    const handleNextClick = () => {
        if (activeTab < items.length) {
            setActiveTab(prev => prev + 1);
            setDisabled(true);
            if (activeTab == items.length - 1) {
                onPollComplete();
            }
        }
    };

    if (!isActive) return null;

    return (
        <div className="survey-section">
            {activeTab < items?.length && <h4>{pollData?.title}</h4>}

            <PollsTabs items={items} activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="survey-action">
                {(activeTab < items?.length) && (
                    <NormalButton
                        icon={Arrow}
                        text="التالي"
                        onClick={handleNextClick}
                        disabled={(activeTab >= items?.length + 1) || disabled}
                    />
                )}
            </div>
        </div>
    );
}
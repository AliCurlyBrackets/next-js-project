'use client'
import React from 'react'
import { Tabs as AntdTabs } from 'antd'

export default function PollsTabs({ className = '', items = [], activeTab = 0, setActiveTab }) {
    return (
        <AntdTabs
            className={className}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(parseInt(key))}
            defaultActiveKey={activeTab}
            renderTabBar={() => { return null; }}
            items={items?.map((item, index) => {
                return {
                    key: item?.key || index,
                    label: item?.label || `Tab ${index}`,
                    children: <div>{item?.children || `Content ${index}`}</div>,
                }
            }
            )}
        />
    )
}

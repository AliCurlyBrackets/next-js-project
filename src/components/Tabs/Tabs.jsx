'use client'
import React, { useState } from 'react'
import { Tabs as AntdTabs, Col, Row } from 'antd'

export default function Tabs({ className = '', items = [] }) {
    const [activeTab, setActiveTab] = useState(items[0]?.key || 0)

    return (
        <AntdTabs
            className={className}
            activeKey={activeTab}
            onChange={(key) => setActiveTab(parseInt(key))}
            defaultActiveKey={activeTab}
            renderTabBar={() => {
                return (
                    <div className='tab-head-row'>
                        <Row justify={'space-between'}>
                            {items?.map((item, index) => {
                                return (
                                    <Col
                                        key={item?.key || index}
                                        lg={Math.floor(24 / items.length)}
                                        xs={24}
                                        className={`${activeTab == item?.key ? 'active-tab' : ''}`}
                                        onClick={() => setActiveTab(item?.key)}
                                    >
                                        <div className="tab-head-card">
                                            {activeTab == item?.key ? item?.activeIcon : item?.icon}
                                            <span>{item?.label}</span>
                                        </div>
                                    </Col>
                                )
                            })}
                        </Row>
                    </div>
                )
            }}
            items={items?.map((item, index) => {
                return {
                    key: item?.key || index,
                    label: item?.label || `Tab ${index}`,
                    children: <div>{item?.children || `Content ${index}`}</div>,
                    icon: item?.key == activeTab ? item?.activeIcon : item?.icon,
                }
            }
            )}
        />
    )
}

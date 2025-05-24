import React from 'react';
import { Collapse } from 'antd';

export default function Toggler({ items = [] }) {

    return (
        <Collapse accordion={true} items={items} defaultActiveKey={[items?.[0]?.key || ""]} bordered={false} expandIconPosition="end" />
    )
}

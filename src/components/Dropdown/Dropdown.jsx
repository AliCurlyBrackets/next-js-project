'use client'

import React from 'react'
import { Dropdown as AntDropdown } from 'antd'
import { usePathname } from 'next/navigation'
import NormalButton from '../Buttons/NormalButton'
import Arrow from '@/assets/images/icons/menu-arrow.svg'
import ArrowActive from '@/assets/images/icons/menu-arrow-active.svg'

export default function Dropdown({ arrow = true, icon = '', text = "", className = "", path = "", items = [] }) {
    const pathname = usePathname();
    const pathnameWithoutLang = pathname.split('/')?.[1] || '';

    return (
        <AntDropdown
            className={`${className}`}
            menu={{ items }}
            trigger={['click']}
            placement="bottom"
            arrow
        >
            <NormalButton
                text={text}
                icon={arrow ? (pathnameWithoutLang == path ? ArrowActive : Arrow) : ''}
                iconRight={icon}
                path={path}
            />
        </AntDropdown>
    )
}

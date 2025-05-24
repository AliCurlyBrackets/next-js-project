'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import SearchIcon from '@/assets/images/icons/search.svg'
import Text from '../Inputs/Text'
import './Search.css'

export default function Search({ icon = '', placeholder = '', className = '' }) {
  const [search, setSearch] = useState('');
  const searchTimeoutRef = useRef(null);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const updatedSearchParams = new URLSearchParams(searchParams);

  const handleChange = useCallback((value) => {
    setSearch(value);
  }, []);

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      updatedSearchParams.set('search', search);
      updatedSearchParams.set('page', '1');
      router.push(`${pathname}?${updatedSearchParams.toString()}`, { scroll: false });
    }, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  return (
    <Text
      id='search'
      name='search'
      size="large"
      placeholder={placeholder}
      className={`search ${className}`}
      icon={icon ? icon : SearchIcon}
      state={search}
      setState={handleChange}
    />
  )
}

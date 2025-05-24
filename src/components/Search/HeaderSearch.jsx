'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react'
import { getSearch } from '@/services/generalServices';
import { usePathname } from 'next/navigation';
import SearchIcon from '@/assets/images/icons/search.svg'
import Text from '../Inputs/Text'
import sweetAlert from '@/helpers/sweetAlert';
import Result from './Result';
import './Search.css'

export default function HeaderSearch({ icon = '', placeholder = '', className = '', toggleSearch }) {
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(null);
  const pathname = usePathname();
  const searchTimeoutRef = useRef(null);

  const handleChange = useCallback((value) => {
    setSearch(value);
  }, []);

  const handleSearchResult = async (search) => {
    if (!search) {
      return;
    }

    try {
      const { data } = await getSearch(`search=${search}`);
      setResult(data);
    } catch (error) {
      sweetAlert.error('حدث خطأ أثناء البحث');
    }
  }

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      handleSearchResult(search);
    }, 1000);

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [search]);

  useEffect(() => {
    if (!search) {
      setResult(null);
    }

    return () => {
      setResult(null);
    }
  }, [search]);

  useEffect(() => {
    setSearch('');

    return () => {
      setSearch('');
    }
  }, [pathname]);

  return (
    <div className={`search-card ${toggleSearch ? 'active' : ''}`}>
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
      <Result result={result} setSearch={setSearch} />
    </div>
  )
}

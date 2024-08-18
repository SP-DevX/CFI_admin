"use client"

import { useAppDispatch, useAppSelector } from '@/redux/Store'
import React, { useEffect } from 'react'
import Loader from './Loader'
import { setLoading } from '@/redux/slices/AdminSlice'

const Loading = () => {
    const dispatch = useAppDispatch();
    const { loading } = useAppSelector(state => state.admin);
    useEffect(() => {
        setTimeout(() => {
            dispatch(setLoading(false));
        }, 3000);
    }, []);
    return (
        <>
            {
                loading && <Loader />
            }
        </>
    )
}

export default Loading

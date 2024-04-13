'use client'
import React from 'react'
import { SearchParamsBarProvider } from './SearchParamsBar'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SearchParamsBarProvider>
        {children}
    </SearchParamsBarProvider>
  )
}

export default Provider
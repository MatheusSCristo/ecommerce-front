'use client'
import React from 'react'
import { ProductsProvider } from './Products'
import { SearchParamsBarProvider } from './SearchParamsBar'

const Provider = ({children}:{children:React.ReactNode}) => {
  return (
    <SearchParamsBarProvider>
      <ProductsProvider>
        {children}
      </ProductsProvider>
    </SearchParamsBarProvider>
  )
}

export default Provider
import React from 'react'

const PageLoader = ({isLoading}:{isLoading:boolean}) => {
  return (
    isLoading ? <div className='pageLoader'/> : null
  )
}

export default PageLoader
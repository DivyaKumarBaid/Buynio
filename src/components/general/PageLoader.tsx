import React from 'react'

const PageLoader = ({isLoading}:{isLoading:Boolean}) => {
  return (
    isLoading ? <div className='pageLoader'/> : null
  )
}

export default PageLoader
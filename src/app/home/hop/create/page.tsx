import HopCreator from '@/components/hops/HopCreator'
import React from 'react'

const page = () => {
  return (
    <div className='w-full h-[calc(96vh-2rem)] overflow-auto'>
      <HopCreator/>
    </div>
  )
}

export default page
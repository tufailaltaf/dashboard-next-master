'use client'
import { get_response } from '@/actions/response'
import React from 'react'

const page = () => {
    const {data} = get_response(`/api/get_revenue`)
    //const data = await getData()
    //console.log(data)
  return (
 
     <main>
      <h1>Revenue: </h1>
      {data?.slice(0, 12).map((revenue:any) => (
        <div key={revenue.id} className='py-4'>
          <h2><span className='font-bold'>Month:</span> {revenue.month}</h2>
          <p><span className='font-bold'>Amount:</span> {revenue.revenue}</p>
        </div>
      ))}
    </main>
  )
}

export default page
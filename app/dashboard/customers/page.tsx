'use client'
import {get_response} from '@/actions/response'
import Image from 'next/image'
export default function Invoices() {
  
const {data} = get_response(`/api/get_customers`)
  //const data = await getData()
  //console.log(data)
  return <main>
    <h1>Customers: </h1>
    {data?.map((customers:any) => (
      <div key={customers.id} className='py-4'>
        <h2><span className='font-bold'>Name :</span>{customers.name} </h2>
        <p><span className='font-bold'>Email:</span> {customers.email}</p>
        <p><span className='font-bold'>Image:</span> {customers.image_url}</p>
        <Image
          src={customers.image_url}
          className="rounded-full"
          width={28}
          height={28}
          alt={`${customers.name}'s profile picture`}
        />
      </div>
    ))}
  </main>
}
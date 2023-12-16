'use client'
import {get_response} from '@/actions/response'
export default function Page() {
  
const {data} = get_response(`/api/get_users`)
  //const data = await getData()
  //console.log(data)
  return <main>
    <h1>Users: </h1>
    {data?.map((users:any) => (
      <div key={users.id} className='py-4'>
        <h2><span className='font-bold'>Name:</span> {users.name}</h2>
        <p><span className='font-bold'>Email:</span> {users.email}</p>
        <p><span className='font-bold'>Password:</span> {users.password}</p>
        {/* <p><span className='font-bold'>Status:</span> {users.status}</p> */}
      </div>
    ))}
  </main>
}
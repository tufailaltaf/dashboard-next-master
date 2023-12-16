// 'use client'
// import {get_response} from '@/actions/response'
// export default function CreateUser() {
//   async function onSubmit(event: FormEvent<HTMLFormElement>) {
//     event.preventDefault()
//     const formData = new FormData(event.currentTarget)
//     const {data} = get_response(`/api/create_users`, {
//       method: 'POST',
//       body: formData,
//     })
 
//     // Handle response if necessary
//     const newdata = await data.json()
//     // ...
//   }
  
//     const {data} = get_response(`/api/create_users`)
//   //console.log(data)
//   return(
//     <main>
//       <h1 className="text-3xl font-bold">Create User</h1>
//       <form>
//         <div className="flex flex-col gap-4 py-8">
//         <span > Name: 
//         <input type="text" placeholder="Enter You Name" />
//         </span>
//         <span>
//           Email:  <input type="email" placeholder="Enter You Email " />
//         </span>
//         <span>
//         Password: <input type="password" placeholder="Enter You Password" />
//         </span>
//         <span>
//          <button type="submit" className="rounded-md border p-2 bg-blue-200 hover:bg-gray-100">Add User</button>
//         </span>
//         </div>
//         </form>
//   </main> 
//   )  
 
// }
'use client'
import { FormEvent } from 'react';
// import { get_response } from '@/actions/response';
import { object, string } from 'zod';

export default function CreateUser() {
const userschema = object({
  name: string().min(2).max(50).optional(),
  email: string().email(),
  password: string().min(8),
});

async function onSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();

  const form = event.target as HTMLFormElement;
  const nameInput = form.elements.namedItem('name') as HTMLInputElement;
  const emailInput = form.elements.namedItem('email') as HTMLInputElement;
  const passwordInput = form.elements.namedItem('password') as HTMLInputElement;

  const validatedData = {
    name: nameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
  };
//console.log(validatedData)
try {
  
  const response = await fetch('/api/create_users', {
    method: 'POST',
    body: JSON.stringify(validatedData),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (response.ok) {
    const responseData = await response.json();
    // Handle the response data here
  } else {
    console.error('Error:', response.status);
  }
} catch (error) {
  console.error('Validation error:', error);
}
}
return (
  <main>
    <h1 className="text-3xl font-bold">Create User</h1>
    
    <form onSubmit={onSubmit} method='POST'>
      <div className="flex flex-col gap-4 py-8">
        <span>
          Name:
          <input type="text" name="name" placeholder="Enter Your Name" />
        </span>
        <span>
          Email:
          <input type="email" name="email" placeholder="Enter Your Email" />
        </span>
        <span>
          Password:
          <input
            type="password"
            name="password"
            placeholder="Enter Your Password"
          />
        </span>
        <button
          type="submit"
          className="rounded-md border p-2 bg-blue-200 hover:bg-gray-100"
        >
          Add User
        </button>
      </div>
    </form>
  </main>
)}
;
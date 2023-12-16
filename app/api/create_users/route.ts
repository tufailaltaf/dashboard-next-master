//"add data to database from the existing table"
import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
import {User} from 'prisma/prisma-client'

//  export async function POST (request: NextRequest) {
//   //console.log("test"+request)
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    // console.log("Request data:", requestData);
    const userData: User | null = requestData ? requestData as unknown as User : null;
    const responseData = await prismadb.user.create({
      data: {
        name: userData ? userData.name : null,
        email: userData ? userData.email : '',
        password: userData ? userData.password : ''
      }
    });
    return new NextResponse(JSON.stringify({ data: responseData }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);

    return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  //   return new NextResponse(JSON.stringify({ data: requestData }), {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // } catch (error) {
  //   console.error('Error:', error);

  //   return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
  //     status: 500,
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  // }

//   const userData: User | null = request.body ? (request.body as unknown as User) : null;
// const responsedata = await prismadb.user.create({
//   data: {
//     user_id: userData ? userData.user_id : '',
//     name: userData ? userData.name : null,
//     email: userData ? userData.email : '',
//     password: userData ? userData.password : ''
//   }
//   })
//   // const responseBody = JSON.stringify(responsedata)
  // return NextResponse.json({
  //   data: request
  // })
  
//   return NextResponse.json({
//     message:responsedata,
//     status: 200,
//     statusText: 'OK',
//     headers: {
//       'Access-Control-Allow-Origin': '*',
//       'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
//       'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//     },
//     body: request
//   })
}

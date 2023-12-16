import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function GET (request: NextRequest) {
const customerdata = await prismadb.customers.findMany({
  })
//   const responseBody = JSON.stringify(invoicedata)
  return NextResponse.json({
    data:customerdata,
    status: 200,
    statusText: 'OK',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: request
  })
}
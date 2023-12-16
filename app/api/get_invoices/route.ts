import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function GET (request: NextRequest) {
const invoicedata = await prismadb.invoices.findMany({
  include: {
    customer: true,
  },
  })
//   const responseBody = JSON.stringify(invoicedata)
  return NextResponse.json({
    data:invoicedata,
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
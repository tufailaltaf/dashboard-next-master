import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function GET (request: NextRequest,{ params }: { params: { id: number } }) {
  console.log('params',params.id)
const invoicedata = await prismadb.invoices.findUnique({
        where: {
          id: parseInt(String(params.id)),
        },include: {
          customer: true,
        },
  })
  console.log(invoicedata,'data invoice created')
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
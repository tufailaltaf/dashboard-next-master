import prismadb from "@/app/lib/prismadb"
import { revenue } from "@/app/lib/tables";
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server'
export async function GET (request: NextRequest) {
const revenuedata = await prismadb.revenue.createMany({
    data : revenue
  })
  const responseBody = JSON.stringify(revenuedata)
  return NextResponse.json({
    message:responseBody,
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
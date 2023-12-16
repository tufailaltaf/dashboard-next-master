import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function POST (request: NextRequest,{ params }: { params: { id: number } }) {
  const deleted_data = await prismadb.invoices.delete({
    where: {
      id: parseInt(String(params.id)),
    }
  })
  return NextResponse.json({
    data:deleted_data,
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
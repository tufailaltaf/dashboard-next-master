import prismadb from "@/app/lib/prismadb";
import { customers } from "@/app/lib/tables";

import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  

  const customerdata = await prismadb.customers.createMany({
    data: customers,
  });

  const responseBody = JSON.stringify(customerdata);
  return NextResponse.json({
    message: responseBody,
    status: 200,
    statusText: 'OK',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
    body: request,
  });
}
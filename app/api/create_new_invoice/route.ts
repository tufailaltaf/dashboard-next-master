//"add data to database from the existing table"
import { Invoice } from "@/app/lib/definitions";
import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    // console.log("Request data:", requestData);
    const invoiceData: Invoice | null = requestData 
    console.log(invoiceData,'data invoice created')
    const responseData = await prismadb.invoices.create({
      data: {
        customer_id: invoiceData ? invoiceData.customer_id : '',
        amount: invoiceData ? invoiceData.amount : 0,
        status: invoiceData ? invoiceData.status : '',
        date: invoiceData ? invoiceData.date : '',
      }
    });
    return new NextResponse(JSON.stringify({ data: responseData }), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error:', error);

    // return new NextResponse(JSON.stringify({ error: 'An error occurred' }), {
    //   status: 500,
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }
}
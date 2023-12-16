//"add data to database from the existing table"
import { Invoice } from "@/app/lib/definitions";
import prismadb from "@/app/lib/prismadb"
import { NextRequest, NextResponse } from 'next/server'
export async function POST(request: NextRequest) {
  try {
    const requestData = await request.json();
    // console.log("Request data:", requestData);
    const updateInvoice= requestData 
    console.log(updateInvoice,'data invoice updated , route page')
    const responseData = await prismadb.invoices.update({
        where:{id: updateInvoice.id },
      data: {
        customer_id: updateInvoice.customer_id ,
        amount:  updateInvoice.amount,
        status:  updateInvoice.status ,
        date:  updateInvoice.date ,
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
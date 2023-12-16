
import { get_response } from '@/actions/response';
import { PrismaClient, User } from '@prisma/client';
import { InvoicesTable, InvoiceForm, CustomerField, CustomersTableType, Invoice } from './definitions';
import { formatCurrency } from './utils';

const prisma = new PrismaClient();

// export async function fetchRevenue() {
//   try {
//     const data = await prisma.revenue.findMany();

//     return data;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch revenue data.');
//   }
// }

export  function fetchLatestInvoices() {
  try {
    const {data} = get_response(`/api/get_invoices`)

    const latestInvoices = data.map((invoice: { amount: any; }) => ({
      ...invoice,
      amount: formatCurrency(invoice.amount),
    }));
    return latestInvoices;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest invoices.');
  }
}
//

// const ITEMS_PER_PAGE = 6;

// export async function fetchFilteredInvoices(searchQuery: string, currentPage: number) {
//   const ITEMS_PER_PAGE = 10;
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const invoices = await prisma.invoices.findMany({
//       select: {
//         id: true,
//         amount: true,
//         date: true,
//         status: true,
//         customer: {
//           select: {
//             name: true,
//             email: true,
//             image_url: true,
//           },
//         },
//       },
//       where: {
//         OR: [
//           { customer: { name: { contains: searchQuery } } },
//           { customer: { email: { contains: searchQuery } } },
//           { amount: parseInt(searchQuery) || undefined },
//           { date: { contains: searchQuery } },
//           { status: { contains: searchQuery } },
//         ].filter((condition) => condition !== undefined),
//       },
//       orderBy: {
//         date: 'desc',
//       },
//       take: ITEMS_PER_PAGE,
//       skip: offset,
//     });

//     return invoices;
//   } catch (error) {
//     console.error('Database Error:', error);
//     throw new Error('Failed to fetch invoices.');
//   }
// }
// export function fetchFilteredInvoices(query: string, currentPage: number,) {
//   const ITEMS_PER_PAGE = 10;
//   const offset = (currentPage - 1) * ITEMS_PER_PAGE;

//   try {
//     const {data} = get_response(`/api/get_invoices`)
//     const invoicedata =data 
//     const filteredInvoices = invoicedata.filter((invoice: any) => {
//       console.log(invoice,'invoice from data.ts')
//       return (
//         filteredInvoices.customer.name.includes(query) ||
//         filteredInvoices.customer.email.includes(query) ||
//         String(filteredInvoices.amount).includes(query) ||
//         filteredInvoices.date.includes(query) ||
//         filteredInvoices.status.includes(query)
//       );
//     });

//     const totalPages = Math.ceil(filteredInvoices.length / ITEMS_PER_PAGE);
//     const paginatedInvoices = filteredInvoices.slice(offset, offset + ITEMS_PER_PAGE);

//     return {
//       invoices: paginatedInvoices,
//       totalPages: totalPages,
//     };
//   } catch (error) {
//     console.error('Error:', error);
//     throw new Error('Failed to fetch filtered invoices.');
//   }
// }
'use client';
import Pagination from '@/app/ui/invoices/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/invoices/table';
import { CreateInvoice } from '@/app/ui/invoices/buttons';
import { lustiana } from '../../ui/font';
import { Suspense } from 'react';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { get_response } from '@/actions/response';


// export function fetchInvoicesPages(query: string) {
//   const {data} = get_response(`/api/get_invoices`)
//   const invoices = data
//   const ITEMS_PER_PAGE = 6;
//     // no of invoices
// const numberOfInvoices = invoices?.length;

//     const count = numberOfInvoices?.length;
//     const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
//     return totalPages;
//   }
export default  function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  // const totalPages =  fetchInvoicesPages(query);

    const { data } = get_response(`/api/get_invoices`);
    const invoices = data;
  
    const ITEMS_PER_PAGE = 6;
    const filteredInvoices = invoices?.filter((invoice: any) => {
      return (
        invoice.customer.name.includes(query) ||
        invoice.customer.email.includes(query) ||
        String(invoice.amount).includes(query) ||
        invoice.date.includes(query) ||
        invoice.status.includes(query)
      );
    })
    const count = filteredInvoices?.length;
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
  
  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lustiana.className} text-2xl`}>Invoices</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search invoices..." />
        <CreateInvoice />
      </div>
      {/* <Suspense key={query + currentPage} fallback={<InvoicesTableSkeleton />}> */}
        <Table query={query} currentPage={currentPage} />
      {/* </Suspense> */}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}
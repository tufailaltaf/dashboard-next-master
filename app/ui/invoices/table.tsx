'use client'
import Image from 'next/image';
import { UpdateInvoice, DeleteInvoice } from '@/app/ui/invoices/buttons';
import InvoiceStatus from '@/app/ui/invoices/status';
import { formatDateToLocal, formatCurrency } from '@/app/lib/utils';
// import { fetchFilteredInvoices } from '@/app/lib/data';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react';
import { get_response } from '@/actions/response';

export function fetchInvoicesPages(query: string) {
  const {data} = get_response(`/api/get_invoices`)
  const invoices = data
  const ITEMS_PER_PAGE = 6;
    // no of invoices
const numberOfInvoices = invoices?.length;

    const count = numberOfInvoices?.length;
    const totalPages = Math.ceil(count / ITEMS_PER_PAGE);
    return totalPages;
  }
export default  function InvoicesTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const {data} = get_response(`/api/get_invoices`)
const latestInvoices = data
  // const invoices = fetchFilteredInvoices(query, currentPage);
  // console.log(invoices,'invoices from table')
  // filtered invoices for search
  const totalPages = fetchInvoicesPages(query);

  const filteredInvoices = latestInvoices?.filter((invoice: any) => {
    return (
      invoice.customer.name.includes(query) ||
      invoice.customer.email.includes(query) ||
      String(invoice.amount).includes(query) ||
      invoice.date.includes(query) ||
      invoice.status.includes(query)
    );
  });
  const invoicesPerPage = 6;
  const startIndex = (currentPage - 1) * invoicesPerPage;
  const endIndex = startIndex + invoicesPerPage;
  const paginatedInvoices = filteredInvoices?.slice(startIndex, endIndex);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {paginatedInvoices?.map((invoice:any) => (
              <div
                key={invoice.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <Image
                        src={invoice.customer.image_url}
                        className="mr-2 rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.customer.name}'s profile picture`}
                      />
                      <p>{invoice.customer.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{invoice.customer.email}</p>
                  </div>
                  <InvoiceStatus status={invoice.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {formatCurrency(invoice.amount)}
                    </p>
                    <p>{formatDateToLocal(invoice.date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <UpdateInvoice id={invoice.id} />
                    <DeleteInvoice id={invoice.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Customer
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Amount
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {paginatedInvoices?.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Image
                        src={invoice.customer.image_url}
                        className="rounded-full"
                        width={28}
                        height={28}
                        alt={`${invoice.customer.name}'s profile picture`}
                      />
                      <p>{invoice.customer.name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {invoice.customer.email}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(invoice.date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <InvoiceStatus status={invoice.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateInvoice id={invoice.id} />
                      <DeleteInvoice id={invoice.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
'use client';
import Form from '@/app/ui/invoices/edit-form';
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs';
import { get_response } from '@/actions/response';
import { notFound } from 'next/navigation';

export default function Page({ params }: { params: { id: number } }) {
    const id = params.id;
    const { data } = get_response(`/api/get_invoices/${id}`);
    // const invoice = data?.find((invoice: { id: string; }) => invoice.id === id);
    // console.log(id, 'data');
    const invoice = data;
    // console.log(invoice, 'invoice');
    // const customers = data?.customer
    // console.log(customers, 'customers');
const {data: customers} = get_response(`/api/get_customers`)
  if(!invoice) {
    notFound()
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Invoices', href: '/dashboard/invoices' },
          {
            label: 'Edit Invoice',
            href: `/dashboard/invoices/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
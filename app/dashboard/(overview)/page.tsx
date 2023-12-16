'use client';
import { Card } from '@/app/ui/dashboard/cards';
import RevenueChart from '@/app/ui/dashboard/revenue-chart';
import LatestInvoices from '@/app/ui/dashboard/latest-invoices';
import { lustiana } from '../../ui/font';
import { get_response } from '@/actions/response';
import { Suspense } from 'react';
import { RevenueChartSkeleton } from '../../ui/skeletons';

 
export default  function Page() {
const {data} = get_response(`/api/get_invoices`)
const latestInvoices = data
//console.log('latestInvoices',latestInvoices)
// paid invoices
const totalPaidInvoices = latestInvoices?.filter((invoice: { status: string; }) => invoice.status === 'paid').length;
//console.log('paid invoices',totalPaidInvoices)
// paid invoices
const totalPendingdInvoices = latestInvoices?.filter((invoice: { status: string; }) => invoice.status === 'pending').length;
//console.log('pending invoices',totalPendingdInvoices)
  //
// no of invoices
const numberOfInvoices = latestInvoices?.length;
//console.log('numberOfInvoices',numberOfInvoices)

// no of customers
// Filter the invoices to get an array of customer objects
const customerObjects = latestInvoices?.filter((item: any) => {
  return item.customer;
});
// Get the number of customer objects
const numCustomerObjects = customerObjects?.length || 0;
//console.log("Number of customer objects:", numCustomerObjects);
// revenue
const {data: revenueData} = get_response(`/api/get_revenue`)
const revenue = revenueData

// //console.log("invoiceData",invoiceData)

// const latestInvoices = {
//   model1: invoiceData,
//   model2: numberOfCustomers,
// };
// //console.log(latestInvoices)
  return (
    
    <main>
      <h1 className={`${lustiana.className} mb-4 text-xl md:text-2xl`}>
        Dashboard
      </h1>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card title="Collected" value={totalPaidInvoices} type="collected" /> 
         <Card title="Pending" value={totalPendingdInvoices} type="pending" /> 
         <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
         <Card
          title="Total Customers"
          value={numCustomerObjects}
          type="customers"
        /> 
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        
        <Suspense fallback={<RevenueChartSkeleton />}>
        <RevenueChart revenue={revenue} />
        </Suspense>
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  );
}
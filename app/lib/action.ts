import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { AuthError } from 'next-auth';
const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});
const CreateInvoice = FormSchema.omit({ id: true, date: true })
const UpdateInvoice = FormSchema.omit({ date: true, id: true });
export async function createInvoice(formData: FormData) {
  const status = formData.get('status') || ''; // Default to empty string if status is null
  const { customerId, amount } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: status === 'pending' || status === 'paid' ? status : '', // Only accept 'pending' or 'paid'
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  const new_invoice_data = {
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
  }
  console.log(new_invoice_data, 'data');
  // send data to the database

  try {
    const response = await fetch('/api/create_new_invoice', {
      method: 'POST',
      body: new_invoice_data ? JSON.stringify(new_invoice_data) : null,
      headers: {
        'Content-Type': 'application/json',
      },

      
    });
    revalidatePath('/dashboard/invoices');
    // redirect('/dashboard/invoices');
    if (response.ok) {
      const responseData = await response.json();
     
      // Handle the response data here
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Validation error:', error);
  }
//   revalidatePath('../dashboard');
  redirect('/dashboard/invoices');
  }
  // Update Invoice
  export async function updateInvoice(
    id: number,
    formData: FormData,
  ) {
    const status = formData.get('status') || ''; // Default to empty string if status is null
console.log(formData, 'form data from the edit action');
    const { customerId, amount } = UpdateInvoice.parse({
      customerId: formData.get('customerId'),
      amount: formData.get('amount'),
      status: status === 'pending' || status === 'paid' ? status : '', // Only accept 'pending' or 'paid'
    });
    const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  const updateInvoice = {
    id: id,
    customer_id: customerId,
    amount: amountInCents,
    status,
    date,
  }
  console.log(updateInvoice, 'data from the edit action');

  // send data to the database

  try {
    const response = await fetch('/api/update_invoice', {
      method: 'POST',
      body: updateInvoice ? JSON.stringify(updateInvoice) : null,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // revalidatePath('/dashboard/invoices');
    // redirect('/dashboard/invoices');
    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData, 'data');
     
      // Handle the response data here
    } else {
      console.error('Error:', response.status);
    }
  } catch (error) {
    console.error('Validation error:', error);
  }
  // revalidatePath('../dashboard');
  redirect('/dashboard/invoices');
  }
  export async function deleteInvoice(id: string) {
    const delete_invoice = {
      id: id,
    }
    console.log(delete_invoice, 'action delete')
    try {
      const response = await fetch(`/api/delete_invoice/${id}`, {
        method: 'POST',
        body: delete_invoice ? JSON.stringify(delete_invoice) : null,
        headers: {
          'Content-Type': 'application/json',
        },
        
  })}
    catch (error) {
      console.error('Error:', error);
    }
  redirect('/dashboard/invoices');
  }

  // Authentication

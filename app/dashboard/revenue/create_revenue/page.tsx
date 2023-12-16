'use client';
import React from 'react';
import useSWR from 'swr';

export default function Revenue() {
  const fetcher = (url: RequestInfo | URL) => fetch(url).then((res) => res.json());

  const { data: revenue, error } = useSWR('../../api/create_revenue', fetcher);

  if (error) {
    console.error("Error retrieving revenue data:", error);
  }

  if (!revenue) {
    return <div>Loading...</div>;
  }

  try {
    //console.log(JSON.parse(revenue));
  } catch (error) {
    console.error("Error parsing revenue data:", error);
  }
  return (
    <main>
      <h1>Create Invoice</h1>
    </main>
  );
}


// Delete data from the table

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// async function deleteAllData() {
//   try {
//     // Delete all data
//     const deletedData = await prisma.revenue.deleteMany();
//     //console.log("Data deleted:", deletedData);

//     // Reset auto-generated IDs to 1
//     // ...
//   } catch (error) {
//     console.error("Error deleting data:", error);
//   } finally {
//     await prisma.$disconnect();
//   }
// }

// deleteAllData();
// export default deleteAllData
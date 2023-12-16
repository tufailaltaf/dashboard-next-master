'use client'
import { useEffect, useState } from "react"
export default async function Invoices() {
  
const [Invoice, setInvoice] = useState([])
  useEffect(() => {
    async function getData() {
      const res = await fetch(`../../api/create_invoices`)
      const data = await res.json()
      //return data
      setInvoice(data)
    }
    getData()
  },[])
  //const data = await getData()
  //console.log(Invoice)
  return <main>
    <h1>Create Invoice</h1>
  </main>
}
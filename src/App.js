import './App.css'
import React, { useState, useEffect } from 'react'
import { CustomersTable } from './components'
import { addCustomer, getCustomers } from './api/api'

function App() {
   const [customerData, setCustomerData] = useState([])

   const handleAddCustomer = async (event) => {
      const input = document.getElementById('customer-name-input').value
      if (input === '') {
         console.log('empty username-input')
         return
      }
      await addCustomer(input)
      // Fetch the updated customer data and set the state variable
      const updatedData = await getCustomers()
      setCustomerData(updatedData)
   }

   useEffect(() => {
      const fetchCustomers = async () => {
         const customers = await getCustomers()
         setCustomerData(customers)
      }
      fetchCustomers()
      console.log(customerData)
   }, [])

   return (
      <div className="App">
         <header className="App-header">
            <input type="text" id="customer-name-input" />
            <nobr />
            <button onClick={handleAddCustomer}>add Customer</button>
            <CustomersTable customerData={customerData} />
         </header>
      </div>
   )
}

export default App

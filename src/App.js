import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import { CustomersTable } from './components'
import { addCustomer, getCustomers } from './api/api'

function App() {
   const [customerData, setCustomerData] = useState([])
   const customerNameInputRef = useRef(null)
   const handleAddCustomer = async (event) => {
      const input = customerNameInputRef.current.value
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
            <div id="add-customer-container">
               <input
                  ref={customerNameInputRef}
                  type="text"
                  id="add-customer-input"
                  placeholder='Customer Name'
               />
               <button id="add-customer-button" onClick={handleAddCustomer}>
                  add Customer
               </button>
            </div>

            <CustomersTable customerData={customerData} />
         </header>
      </div>
   )
}

export default App

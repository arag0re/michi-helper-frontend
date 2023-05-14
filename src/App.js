import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import { CustomersTable } from './components'
import { addCustomer, getCustomers } from './api/api'

function App() {
   const [customerData, setCustomerData] = useState([])
   const customerNameInputRef = useRef(null)
   const handleAddCustomer = async (event) => {
      var input = customerNameInputRef.current.value
      if (input === '') {
         console.log('empty username-input')
         return
      }

      try {
         const statusCode = await addCustomer(input)
         switch (statusCode) {
            case 409:
               alert('Customer already exists')
               return
            case 200:
               const updatedData = await getCustomers()
               setCustomerData(updatedData)
               break
            default:
               break
         }
      } catch (error) {
         console.error(error)
      }
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
            <div className="add-customer-form">
               <input
                  ref={customerNameInputRef}
                  type="text"
                  className="add-customer-input"
                  placeholder="Customer Name"
               />
               <button
                  className="add-customer-button"
                  onClick={handleAddCustomer}
               >
                  Add
               </button>
            </div>

            <CustomersTable customerData={customerData} />
         </header>
      </div>
   )
}

export default App

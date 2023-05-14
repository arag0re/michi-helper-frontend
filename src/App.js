import './App.css'
import React, { useState, useEffect, useRef } from 'react'
import { CustomersTable, Footer, Navbar } from './components'
import { addCustomer, getCustomers } from './api/api'

function App() {
   const [customerData, setCustomerData] = useState([])
   const [customerName, setCustomerName] = useState('')
   const customerNameInputRef = useRef(null)

   const handleAddCustomer = async (event) => {
      event.preventDefault()

      if (customerName === '') {
         console.log('empty username-input')
         alert('Empty input-field')
         return
      }

      try {
         const statusCode = await addCustomer(customerName)
         switch (statusCode) {
            case 409:
               alert('Customer already exists')
               setCustomerName('') // Clear the input field
               break
            case 200:
               const updatedData = await getCustomers()
               setCustomerData(updatedData)
               setCustomerName('') // Clear the input field
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
      <>
         <div className="App">
            <header className="App-header">
               <Navbar />
               <form className="add-customer-form" onSubmit={handleAddCustomer}>
                  <input
                     type="text"
                     className="add-customer-input"
                     placeholder="Customer Name"
                     value={customerName}
                     onChange={(event) => setCustomerName(event.target.value)}
                     ref={customerNameInputRef}
                  />
                  <button
                     type="submit"
                     className="add-customer-button"
                     onClick={handleAddCustomer}
                  >
                     Add
                  </button>
               </form>

               <CustomersTable customerData={customerData} />
            </header>
         </div>
         <Footer />
      </>
   )
}

export default App

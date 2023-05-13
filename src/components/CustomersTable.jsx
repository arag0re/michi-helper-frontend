import React, { useState, useEffect } from 'react'
import Modal from './Modal'

function CustomersTable({ customerData }) {
   const [data, setData] = useState([])
   const [selectedCustomer, setSelectedCustomer] = useState(null)

   useEffect(() => {
      setData(customerData)
   }, [customerData])

   const handleCustomerClick = (customer) => {
      setSelectedCustomer(customer)
   }

   const handleModalClose = () => {
      setSelectedCustomer(null)
   }

   return (
      <table>
         <thead>
            <tr>
               <th>Name</th>
            </tr>
         </thead>
         <tbody>
            {data.length ? (
               data.map((item, index) => (
                  <tr key={index} onClick={() => handleCustomerClick(item)}>
                     <td>{item.name}</td>
                  </tr>
               ))
            ) : (
               <tr>
                  <td>Loading...</td>
               </tr>
            )}
         </tbody>
         {selectedCustomer && (
            <Modal
               onClose={handleModalClose}
               customer={selectedCustomer.name}
            ></Modal>
         )}
      </table>
   )
}

export default CustomersTable

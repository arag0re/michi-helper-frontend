import React, { useState, useEffect } from 'react'
import { formatDate } from '../utils/formatDate'
import Modal from './Modal'

function CustomersTable({ customerData }) {
   const [data, setData] = useState([])
   const [selectedCustomer, setSelectedCustomer] = useState(null)
   const [refreshCount, setRefreshCount] = useState(0)

   const handleRefresh = (customerData) => {
      setData(customerData)
   }

   useEffect(() => {
      setData(customerData)
   }, [customerData])

   const handleCustomerClick = (customer) => {
      setSelectedCustomer(customer)
   }

   const handleModalClose = () => {
      setSelectedCustomer(null)
   }

   const getLastUpdatedApp = (customer) => {
      let lastUpdated = null
      let lastUpdatedDate = null
      if (!customer.apps) {
         return
      }
      customer.apps.forEach((app) => {
         const _app = JSON.parse(app)
         const updatedAt = new Date(_app.lastUpdated)
         console.log(_app.lastUpdated)
         if (!lastUpdatedDate || updatedAt > lastUpdatedDate) {
            lastUpdated = _app.name
            lastUpdatedDate = formatDate(updatedAt)
         }
      })

      return lastUpdated
         ? `${lastUpdated} (${lastUpdatedDate.toLocaleString()})`
         : 'N/A'
   }

   return (
      <table>
         <thead>
            <tr>
               <th>Name</th>
               <th>Last Updated App</th>
            </tr>
         </thead>
         <tbody>
            {data.length ? (
               data.map((item, index) => (
                  <tr
                     id="customers"
                     key={index}
                     onClick={() => handleCustomerClick(item)}
                  >
                     <td>{item.name}</td>
                     <td>{getLastUpdatedApp(item)}</td>
                  </tr>
               ))
            ) : (
               <tr id="customers">
                  <td>Loading...</td>
               </tr>
            )}
         </tbody>
         {selectedCustomer && (
            <Modal
               onClose={handleModalClose}
               customer={selectedCustomer.name}
               onRefresh={handleRefresh}
            ></Modal>
         )}
      </table>
   )
}

export default CustomersTable

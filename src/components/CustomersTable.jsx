import React, { useState, useEffect } from 'react'
import Modal from './Modal'
import deleteImg from '../assets/delete.png'
import { getApp, deleteCustomer, getCustomers } from '../api/api'

function CustomersTable({ customerData }) {
   const [data, setData] = useState([])
   const [selectedCustomer, setSelectedCustomer] = useState(null)
   const [lastUpdatedApps, setLastUpdatedApps] = useState([])

   useEffect(() => {
      setData(customerData)
   }, [customerData])

   const handleCustomerClick = (customer) => {
      setSelectedCustomer(customer)
   }

   const handleModalClose = () => {
      setSelectedCustomer(null)
      onRefresh()
   }

   const onRefresh = async () => {
      const customers = await getCustomers()
      setData(customers)
   }

   const handleDeleteCustomer = async (customer) => {
      await deleteCustomer(customer.name)
      await getCustomers().then((customers) => setData(customers))
   }

   const getLastUpdatedApp = async (customer) => {
      let lastUpdated = null
      let lastUpdatedDate = null
      if (!customer.apps) {
         return 'N/A'
      }
      const promises = customer.apps.map(async (app) => {
         const _app = await getApp(app)
         const updatedAt = new Date(_app.lastUpdated)
         if (!lastUpdatedDate || updatedAt < lastUpdatedDate) {
            lastUpdated = _app.name
            lastUpdatedDate = updatedAt
         }
      })
      await Promise.all(promises)
      const daysDifference = Math.floor(
         (new Date() - lastUpdatedDate) / (1000 * 60 * 60 * 24),
      )
      let textColor = 'green'
      if (daysDifference > 30) {
         textColor = 'red'
      } else if (daysDifference > 14) {
         textColor = 'orange'
      }
      return lastUpdated ? (
         <span
            style={{ color: textColor }}
         >{`${lastUpdated} (${daysDifference} days ago)`}</span>
      ) : (
         'N/A'
      )
   }

   useEffect(() => {
      const updateLastUpdatedApps = async () => {
         const updatedApps = await Promise.all(
            data.map(async (customer) => await getLastUpdatedApp(customer)),
         )
         setLastUpdatedApps(updatedApps)
      }
      updateLastUpdatedApps()
   }, [data])

   return (
      <table>
         <thead>
            <tr>
               <th>Customer Name</th>
               <th>Oldest Update</th>
               <th></th>
            </tr>
         </thead>
         <tbody>
            {data.map((item, index) => (
               <tr
                  id="customers"
                  key={index}
                  onClick={() => handleCustomerClick(item)}
               >
                  <td>{item.name}</td>
                  <td>{lastUpdatedApps[index]} </td>
                  <td>
                     <button
                        className="delete-btn"
                        onClick={(event) => {
                           event.stopPropagation()
                           handleDeleteCustomer(item)
                        }}
                     >
                        <img id="delete-img" src={deleteImg} alt="delete" />
                     </button>
                  </td>
               </tr>
            ))}
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

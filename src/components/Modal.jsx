import React, { useState, useEffect, useRef } from 'react'
import { getApps, addApp, updateApp } from '../api/api'
import { formatDate } from '../utils/formatDate'
import './Modal.css'

function Modal({ onClose, customer, onRefresh }) {
   const [apps, setApps] = useState([])
   const appNameInputRef = useRef(null)

   useEffect(() => {
      async function fetchData() {
         const apps = await getApps(customer)
         setApps(apps)
         //onRefresh(customer)
      }

      fetchData()
   }, [customer])

   const handleUpdateLastUpdated = async (name) => {
      await updateApp(name, customer)
      const updatedApps = await getApps(customer)
      setApps(updatedApps)
   }

   return (
      <div className="modal">
         <div className="modal-content">
            <button className="close-button" onClick={onClose}>
               &times;
            </button>
            <h2>{customer}'s Apps</h2>
            <table>
               <thead>
                  <tr>
                     <th>Name</th>
                     <th>Last Updated</th>
                     <th>Update</th>
                  </tr>
               </thead>
               <tbody>
                  {apps
                     ? apps.map((app) => (
                          <tr id="apps" key={app.id}>
                             <td>{app.name}</td>
                             <td>{formatDate(app.lastUpdated)}</td>
                             <td>
                                <button
                                   onClick={() =>
                                      handleUpdateLastUpdated(app.name)
                                   }
                                >
                                   Update Now
                                </button>
                             </td>
                          </tr>
                       ))
                     : ''}
               </tbody>
            </table>
            <div id="add-app-container">
               <input
                  id="app-name-input"
                  ref={appNameInputRef}
                  placeholder="App Name"
               ></input>
               <button
                  id="add-app-button"
                  onClick={async () => {
                     const appNameInput = appNameInputRef.current.value

                     if (appNameInput === '') {
                        console.log('empty app name input')
                        return
                     }

                     const newApp = await addApp(appNameInput, customer)
                     setApps((apps) => [...apps, newApp])
                  }}
               >
                  Add App
               </button>
            </div>
         </div>
      </div>
   )
}

export default Modal

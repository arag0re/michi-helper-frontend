import React, { useState, useEffect, useRef } from 'react'
import { getApps, addApp, updateApp, deleteApp } from '../api/api'
import deleteImg from '../assets/delete.png'
import refreshImg from '../assets/refresh.png'
import { formatDate } from '../utils/formatDate'

function Modal({ onClose, customer }) {
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

   const handleDeleteApp = async (name) => {
      await deleteApp(name, customer)
      const apps = await getApps(customer)
      setApps(apps)
   }

   const handleCloseModal = () => {
      onClose()
   }

   return (
      <div className="modal">
         <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
               &times;
            </button>
            <h2>{customer}'s Apps</h2>
            <table>
               <thead>
                  <tr>
                     <th>App Name</th>
                     <th>Last Update</th>
                     <th></th>
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
                                   className="refresh-btn"
                                   onClick={() =>
                                      handleUpdateLastUpdated(app.name)
                                   }
                                >
                                   <img
                                      id="refresh-img"
                                      src={refreshImg}
                                      alt="refresh"
                                   />
                                </button>
                                <br></br>
                                <button
                                   className="delete-btn"
                                   onClick={() => handleDeleteApp(app.name)}
                                >
                                   <img
                                      id="delete-img"
                                      src={deleteImg}
                                      alt="delete"
                                   />
                                </button>
                             </td>
                          </tr>
                       ))
                     : ''}
               </tbody>
            </table>
            <div id="add-app-container">
               <input
                  className="app-name-input"
                  ref={appNameInputRef}
                  placeholder="App Name"
               ></input>
               <button
                  className="add-app-button"
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
                  Add
               </button>
            </div>
         </div>
      </div>
   )
}

export default Modal

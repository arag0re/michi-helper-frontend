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

   const handleAddApp = async (e) => {
      e.preventDefault()

      const appNameInput = appNameInputRef.current.value

      if (appNameInput === '') {
         console.log('empty app name input')
         return
      }

      const newApp = await addApp(appNameInput, customer)
      if (!newApp) {
         alert(appNameInput + ' already exists for this Customer')
         return
      }

      setApps((apps) => [...apps, newApp])
      appNameInputRef.current.value = ''
   }

   useEffect(() => {
      const handleEscapeKey = (event) => {
         if (event.key === 'Escape') {
            handleCloseModal()
         }
      }

      document.addEventListener('keydown', handleEscapeKey)

      return () => {
         document.removeEventListener('keydown', handleEscapeKey)
      }
   }, [])

   return (
      <div className="modal">
         <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
               &times;
            </button>
            <h2>{customer}'s Apps</h2>
            <div id="modal-header">
               <form id="add-app-container" onSubmit={handleAddApp}>
                  <input
                     className="app-name-input"
                     ref={appNameInputRef}
                     placeholder="App Name"
                  />
                  <button className="add-app-button" type="submit">
                     Add
                  </button>
               </form>
            </div>
            <div id="modal-table">
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
                                <td id="td-buttons">
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
            </div>
         </div>
      </div>
   )
}

export default Modal

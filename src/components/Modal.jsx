import React, { useState, useEffect, useRef } from 'react'
//import './Modal.css'
import { getApps, addApp } from '../api/api'

function Modal({ onClose, customer }) {
   const [apps, setApps] = useState([])
   const appNameInputRef = useRef(null)
   useEffect(() => {
      async function fetchData() {
         const apps = await getApps(customer)
         setApps(apps)
      }

      fetchData()
   }, [customer])

   return (
      <div className="modal">
         <div className="modal-content">
            <button className="close-button" onClick={onClose}>
               &times;
            </button>
            <h2>{customer}'s Apps</h2>
            <ul>
               {apps
                  ? apps.map((app) => (
                       <li key={app}>
                          <p>
                             {app.name} {app.createdAt}
                          </p>
                       </li>
                    ))
                  : ''}
            </ul>
            <input ref={appNameInputRef}></input>
            <button
               onClick={async () => {
                  const appNameInput = appNameInputRef.current.value
                  console.log(appNameInput)

                  if (appNameInput === '') {
                     console.log('empty username-input')
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
   )
}

export default Modal
//

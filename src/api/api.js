export async function getCustomers() {
   return await fetch('/api/customer/getAll')
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function addCustomer(name) {
   const data = { name }
   return await fetch('/api/customer/add', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => {
         return response.status
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function deleteCustomer(name) {
   const data = { name }
   return await fetch('/api/customer/delete', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function getApps(customerName) {
   const data = { customerName }
   return await fetch('/api/app/getAll', {
      method: 'POST',

      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function addApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/api/app/add', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function updateApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/api/app/update', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function getApp(appId) {
   const data = { appId }
   return await fetch('/api/app/get', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function deleteApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/api/app/delete', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         //console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

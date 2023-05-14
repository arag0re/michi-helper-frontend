export async function getCustomers() {
   return await fetch('/customer/getAll')
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function addCustomer(name) {
   const data = { name }
   return await fetch('/customer/add', {
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
   return await fetch('/customer/delete', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function getApps(customerName) {
   const data = { customerName }
   return await fetch('/app/getAll', {
      method: 'POST',

      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function addApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/app/add', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function updateApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/app/update', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function getApp(appId) {
   const data = { appId }
   return await fetch('/app/get', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function deleteApp(name, customerName) {
   const data = { name, customerName }
   return await fetch('/app/delete', {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
   })
      .then((response) => response.json())
      .then((data) => {
         console.log(data)
         return data
      })
      .catch((err) => {
         console.log(err)
      })
}

export async function getCustomers() {
   return await fetch('/customer/getCustomers')
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
   return await fetch('/customer/addCustomer', {
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
   return await fetch('/app/getApps', {
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
   return await fetch('/app/addApp', {
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
   return await fetch('/app/updateApp', {
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

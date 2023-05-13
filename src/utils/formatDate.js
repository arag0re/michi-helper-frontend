export function formatDate(dateString) {
   const date = new Date(dateString)
   const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
   }
   return date.toLocaleDateString('de-DE', options)
}

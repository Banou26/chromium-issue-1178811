const iframe = document.createElement('iframe')
iframe.src = 'https://google.com'
document.body.appendChild(iframe)

fetch('https://example.com/').then(res => {
  const customHeader = [...res.headers.entries()].find(([name]) => name === 'a-random-header')
  console.log('Custom header found in the header of the request showing that the header was correctly appended: ', ...customHeader)
})

fetch('https://google.com').catch(err => {
  console.log('This error was caused by the browser just ignoring the CORS header that the extension appended')
  console.error(err)
})

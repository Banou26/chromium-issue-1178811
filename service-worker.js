
// only way to do the behavior in manifest V3 is doing this and it's not working
globalThis.addEventListener('install', async () => {
  chrome.tabs.create({ url: 'https://example.com/' })
  chrome.declarativeWebRequest.onRequest.addRules([{
    conditions: [
      // I also trying explicitly setting the url as all_urls and types as ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'other'] but it doesn't change anything i think
      new chrome.declarativeWebRequest.RequestMatcher({})
    ],
    actions: [
      new chrome.declarativeWebRequest.RemoveResponseHeader({ name: 'X-Frame-Options' }),
      new chrome.declarativeWebRequest.RemoveResponseHeader({ name: 'Access-Control-Allow-Origin' }),
      new chrome.declarativeWebRequest.AddResponseHeader({ name: 'Access-Control-Allow-Origin', value: '*' }),
      new chrome.declarativeWebRequest.AddResponseHeader({ name: 'a-random-header', value: 'foo' }),
    ]
  }])
})

// one way of doing this back in manifest v2 was this and it works well
// chrome.webRequest.onHeadersReceived.addListener(
//   ({ responseHeaders }) => ({
//     responseHeaders: [
//       ...responseHeaders.filter(header =>
//         header.name !== 'x-frame-options' &&
//         header.name !== 'access-control-allow-origin'
//       ),
//       { name: 'access-control-allow-origin', value: '*' }
//     ]
//   }),
//   {
//     urls: ['<all_urls>'],
//     types: ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'object', 'xmlhttprequest', 'other']
//   },
//   ['responseHeaders', 'blocking', 'extraHeaders']
// )

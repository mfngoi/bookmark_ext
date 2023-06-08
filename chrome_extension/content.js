
link = window.location.href;
page_title = document.title;
page_content = document;


chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    // console.log(sender.tab ?
    //             "from a content script:" + sender.tab.url :
    //             "from the extension");
    if (request.greeting === "hello")
      sendResponse({url: link, title: page_title});



    if (request.greeting === "content")
      sendResponse({content: page_content});

  }
);



// ==================================================

// resource = "http://127.0.0.1:5000/content";

// fetch(resource, {
//       method: 'POST',
//       headers: {
//           'Content-type': 'application/json',
//           'Accept': 'application/json'
//       },
//       body: JSON.stringify(link),
// })
// .then((response) => {
//   return response.json();
// })
// .then((result) => {
//   alert(result);
// })

// ==================================================

// chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
//   if (changeInfo.status == 'complete' && tab.active) {

//     link = "http://127.0.0.1:5000/content";

//     response = fetch(link, {
//           method: 'POST',
//           headers: {
//               'Content-type': 'application/json',
//               'Accept': 'application/json'
//           },
//           body: JSON.stringify(tab.url),
//     })
//     .then(response => {
//       return response.json();
//     });
    
//     alert(response)

//   }
// });

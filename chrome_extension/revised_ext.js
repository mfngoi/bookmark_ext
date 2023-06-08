button = document.getElementById("mybutton");
button.onclick = recommend;

content_button = document.getElementById("content_button");
content_button.onclick = submitContent;

create_folder_button = document.getElementById("create_folder");
create_folder_button.onclick = setUpFolders;

create_bookmark_button = document.getElementById("create_bookmark");
create_bookmark_button.onclick = makeBookmark;


async function recommend() {

    text = document.getElementById("sampletxt");
    display = document.getElementById("resultdisplay");


    let webpage = await get_webpage_url();
    let result = await server_recommendation();

    console.log(result);
    text.value = webpage;
    display.innerHTML = result;
}

async function get_webpage_url() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});

    webpage = response.url;
    return webpage;
}

async function server_recommendation() {
    link = "http://54.191.174.249/recommend";
    
    let fetch_response = await fetch(link, 
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                                body: JSON.stringify(webpage),
                                            }
                                        );

    let fetch_result = await fetch_response.json();

    return fetch_result;
}

async function setUpFolders() {

    let bookmarks = await chrome.bookmarks.getTree();
    let otherBookmarks = bookmarks[0].children[1];

    let folder =  await chrome.bookmarks.create({'parentId': otherBookmarks.id, 'title': "Recommended Bookmarks"});

    chrome.bookmarks.create({'parentId': folder.id, 'title': "comp.graphics"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "rec.motorcycles"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "rec.sport.baseball"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "sci.med"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "sci.space"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "soc.religion.christian"});
    chrome.bookmarks.create({'parentId': folder.id, 'title': "talk.politics.mideast"});


}

async function makeBookmark() {

    let webpage = await get_webpage_url();
    let title = await get_webpage_title();
    let result = await server_content();

    let bookmarks = await chrome.bookmarks.getTree();
    let folderId = search_for_id(bookmarks, result);

    if(folderId) {

        chrome.bookmarks.create({'parentId': folderId, 'title': title, 'url': webpage});
        
    } else {

        folderId = // Code to create folder....    [!]
        chrome.bookmarks.create({'parentId': folderId, 'title': title, 'url': webpage});

    }

    
}

async function get_webpage_title() {
    const [tab] = await chrome.tabs.query({active: true, lastFocusedWindow: true});
    const response = await chrome.tabs.sendMessage(tab.id, {greeting: "hello"});

    title = response.title;
    return title;
}

function search_for_id(bookmarks, title) {
        
    for(var i=0; i < bookmarks.length; i++) { 
        // alert("Bookmark title: " + bookmarks[i].title);
        if(bookmarks[i].url == null && bookmarks[i].title == title) {
            // alert("Found Bookmark title: " + bookmarks[i].title);
            // Totally found a folder that matches!
            return bookmarks[i].id;
        } else {
            if(bookmarks[i].children) {  
                // inception recursive stuff to get into the next layer of children
                var id = search_for_id(bookmarks[i].children, title);
                if(id)
                    return id;
            }
        }
    }

    // No results :C
    return false;
}

async function submitContent() {

    text = document.getElementById("sampletxt");
    display = document.getElementById("resultdisplay");


    let webpage = await get_webpage_url();
    let result = await server_content();

    console.log(result);
    text.value = webpage;
    display.innerHTML = result;



}

async function server_content() {
    link = "http://54.191.174.249/content";
    
    let fetch_response = await fetch(link, 
                                            {
                                                method: 'POST',
                                                headers: {
                                                    'Content-type': 'application/json',
                                                    'Accept': 'application/json'
                                                },
                                                body: JSON.stringify(webpage),
                                            }
                                        );

    let fetch_result = await fetch_response.json();

    return fetch_result;
}


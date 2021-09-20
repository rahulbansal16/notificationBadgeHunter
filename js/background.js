const raiseBlockAdEvent = (tabid) => {
    console.log('Raised a Block Ad Event')
    chrome.tabs.sendMessage(tabid, {
        type: 'block-ad'
    })
}

const fetchTabs = () => {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true}, resolve)
    })
}

chrome.webNavigation.onHistoryStateUpdated.addListener( () => {
    console.log('Inside the onHistoryStateUpdated method')
    fetchTabs().then( tabs => tabs[0].id && raiseBlockAdEvent(tabs[0].id))
    // chrome.tabs.query({active: true, currentWindow: true},
    //     function(tabs){
    //         if(tabs[0].id) raiseBlockAdEvent(tabs[0].id)
    //     }
    // );
    // chrome.tabs.sendMessage({
    //     type:'block-ad'
    // })
    // fireBlockAd()
})

chrome.webNavigation.onCompleted.addListener(() => {
    console.log('Inside the onCompleted method')
    fetchTabs().then( tabs => tabs[0].id && raiseBlockAdEvent(tabs[0].id))
})

// });
chrome.webNavigation.onCommitted.addListener(() => {
    console.log('Inside the onCommitted method')
    fetchTabs().then( tabs => tabs[0].id && raiseBlockAdEvent(tabs[0].id))
})
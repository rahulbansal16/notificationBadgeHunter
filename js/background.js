chrome.webNavigation.onHistoryStateUpdated.addListener( () => {
    console.log('Inside the onHistoryStateUpdated method')
    chrome.tabs.query({active: true, currentWindow: true},
        function(tabs){
            if(tabs[0].id) chrome.tabs.sendMessage(tabs[0].id, {type: "block-ad"});
        }
    );
    // chrome.tabs.sendMessage({
    //     type:'block-ad'
    // })
    // fireBlockAd()
})
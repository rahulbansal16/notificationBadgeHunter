const raiseBlockAdEvent = (tabid) => {
  console.log("Raised a Block Ad Event");
  chrome.tabs.sendMessage(tabid, {
    type: "block-ad",
  });
};

const fetchTabs = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true }, resolve);
  });
};

chrome.runtime.onInstalled.addListener( () => {
    console.log("Installing the extension")
    chrome.storage.sync.set({
        notification: 'off'
    }, (result) => {
        console.log("The result", result);
    })
})


chrome.browserAction.onClicked.addListener( () => {
    console.log('The extension icon is clicked');
    toggleState()
})

const toggleState = () => {
    chrome.storage.sync.get(['notification'], (result) => {
        console.log('The value of the result is: ' + result.notification)
        let value =  result.notification === 'off' ? 'on' : 'off';
        console.log('Setting the Notification Status Value', value);
        chrome.storage.sync.set({
            notification: value
        }, () => {
            if (value === "off") {
                chrome.browserAction.setIcon({path: "../assets/extension-icons/notifications-off-32.png"});
            } else {
                chrome.browserAction.setIcon({path: "../assets/extension-icons/notifications-on-32.png"});
            }
        });
    })
}

chrome.webNavigation.onHistoryStateUpdated.addListener(() => {
  console.log("Inside the onHistoryStateUpdated method");
  fetchTabs().then((tabs) => tabs[0].id && raiseBlockAdEvent(tabs[0].id));
});

chrome.webNavigation.onCompleted.addListener(() => {
  console.log("Inside the onCompleted method");
  fetchTabs().then((tabs) => tabs[0].id && raiseBlockAdEvent(tabs[0].id));
});

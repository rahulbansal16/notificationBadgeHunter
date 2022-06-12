let noRedirectToken = 'zctf420otaqimwn9lx8m';
let redirectListener = null;
let error404Listener = null;

// <executed_on_extension_enabled>
chrome.storage.sync.get(['preferred_thumbnail_file'], function (storage) {

    setupThumbnailRedirectListeners(storage.preferred_thumbnail_file);
    console.log("The preferred thumbnail file is: " + storage.preferred_thumbnail_file);
    chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.executeScript(tab.id, {file: 'js/youtube.js'}, function () {
                chrome.tabs.sendMessage(tab.id, {
                    'preferred_thumbnail_file': {
                        newValue: storage.preferred_thumbnail_file
                    }
                });
            });
        })
    });
});
// </executed_on_extension_enabled>

chrome.runtime.onInstalled.addListener(function ({reason}) {
    if (reason === 'install') {
        // default values
        chrome.storage.sync.set({
            preferred_thumbnail_file: 'hq3',
            video_title_format: 'capitalize_first_letter'
        })
    } else if (reason === "update") {
      chrome.storage.sync.set({
        preferred_thumbnail_file: 'hq3',
        video_title_format: 'capitalize_first_letter'
      })
    }
});

chrome.storage.onChanged.addListener(function (changes) {
    if (changes.preferred_thumbnail_file !== undefined) {
        removeThumbnailRedirectListeners();
        setupThumbnailRedirectListeners(changes.preferred_thumbnail_file.newValue);
    }

    chrome.tabs.query({url: '*://www.youtube.com/*'}, function (tabs) {
        tabs.forEach(function (tab) {
            chrome.tabs.sendMessage(tab.id, changes);
        })
    });
});

function setupThumbnailRedirectListeners(preferredThumbnailFile) {
    if (preferredThumbnailFile !== 'hqdefault') {
        chrome.webRequest.onBeforeRequest.addListener(
            redirectListener = function (details) {
                if (!details.url.includes(`&noRedirectToken=${noRedirectToken}`)) {
                    if (details.url.startsWith('https://i.ytimg.com/vi/')) {
                        return {redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault|hq720).jpg/, `${preferredThumbnailFile}.jpg`)};
                    } else if (details.url.startsWith('https://i.ytimg.com/vi_webp/')) {
                        return {
                            redirectUrl: details.url.replace(/(default|hqdefault|mqdefault|sddefault).webp.*/, `${preferredThumbnailFile}.jpg`)
                                .replace('/vi_webp/', '/vi/')
                        };
                    }
                }
            },
            {
                urls: [
                    'https://i.ytimg.com/vi/*/default.jpg*',
                    'https://i.ytimg.com/vi/*/hqdefault.jpg*',
                    'https://i.ytimg.com/vi/*/mqdefault.jpg*',
                    'https://i.ytimg.com/vi/*/sddefault.jpg*',
                    'https://i.ytimg.com/vi/*/hq720.jpg*',
                    'https://i.ytimg.com/vi_webp/*/default.webp*',
                    'https://i.ytimg.com/vi_webp/*/hqdefault.webp*',
                    'https://i.ytimg.com/vi_webp/*/mqdefault.webp*',
                    'https://i.ytimg.com/vi_webp/*/sddefault.webp*'
                ],
                types: ['image']
            },
            ['blocking']
        );

        chrome.webRequest.onHeadersReceived.addListener(
            error404Listener = function (details) {
                if (details.statusCode === 404) {
                    if (details.url.startsWith('https://i.ytimg.com/vi/')) {
                        return {redirectUrl: details.url.replace(`${preferredThumbnailFile}.jpg`, 'hqdefault.jpg') + `&noRedirectToken=${noRedirectToken}`};
                    } else if (details.url.startsWith('https://i.ytimg.com/vi_webp/')) {
                        return {redirectUrl: details.url.replace(`${preferredThumbnailFile}.webp`, 'sddefault.webp') + `&noRedirectToken=${noRedirectToken}`};
                    }
                }
            },
            {
                urls: [
                    `https://i.ytimg.com/vi/*/${preferredThumbnailFile}.jpg*`,
                    `https://i.ytimg.com/vi_webp/*/${preferredThumbnailFile}.webp*`
                ],
                types: ['image']
            },
            ['blocking']
        );
    }
}

function removeThumbnailRedirectListeners() {
    if (redirectListener !== null) {
        chrome.webRequest.onBeforeRequest.removeListener(redirectListener);
    }
    if (error404Listener !== null) {
        chrome.webRequest.onHeadersReceived.removeListener(error404Listener);
    }
}


let alarm = null
const raiseBlockAdEvent = (tabid) => {
  console.log("Raised a Block Ad Event");
  chrome.tabs.sendMessage(tabid, {
    type: "block-ad",
  });
};

const fetchTabs = () => {
  return new Promise((resolve, reject) => {
    chrome.tabs.query({ active: true, currentWindow: true }, resolve);
  });
};

chrome.runtime.onInstalled.addListener( () => {
    console.log("Installing the extension")
    chrome.storage.sync.set({
        notification: 'off'
    }, (result) => {
        console.log("The result", result);
    })
    toggleStateToOffAfter20Minutes()
})


chrome.browserAction.onClicked.addListener( () => {
    console.log('The extension icon is clicked');
    toggleState()
})

const toggleStateToOffAfter20Minutes = () => {
  alarm = chrome.alarms.create("enableBlocker", {
    delayInMinutes: 10,
    periodInMinutes: 10
  })
}

chrome.alarms.onAlarm.addListener(
  () => {
    console.log("Setting the state of the notification to off")
    chrome.storage.sync.set({
      notification:"off"
    })
  },
)

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

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    fetchTabs().then((tabs) => tabs[0].id && raiseBlockAdEvent(tabs[0].id));
});
chrome.storage.sync.get(['notification'], (response) => {
    console.log('In the detect.js reading the notification value', response);
    const notification = response.notification
    if ( notification === "off"){
        initExtension()
    } else {
        return
    }
})

const getHost = () => {
    let host_ = window.location.host;
    host_ = host_.replace("www.", "");
    return host_;
};

const initExtension = () => {
    const host = getHost();
    // #c42523
    // removeBadges(getHost())
    // const links = document.querySelectorAll('link[rel=icon]')
    // console.log('The links are', links)
    // href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
    chrome.runtime.onMessage.addListener((request) => {
        console.log("In the Listener for the block-ad ");
        const { type } = request;
        if (type === "block-ad") {
        modifyTitle(host);
        updateFavicon(host);
        // const updatedLinks = document.querySelectorAll('link[rel=icon]')
        // for (var i in updatedLinks){
        //     updatedLinks[i].href = links[i].href
        // }
        }
    });
    console.log(host);
    var style = document.documentElement.appendChild(
        document.createElement("style")
    );
    style.textContent = generateCSSRule(host);
    // style.textContent = '.indicator-badge {display:none !important;}';

    var s = document.createElement("script");
    s.src = chrome.extension.getURL("./js/mosf.js");
    s.onload = function () {
        this.remove();
    };
    (document.head || document.documentElement).appendChild(s);

    chrome.runtime.sendMessage({
        type: "block-http",
    });
}


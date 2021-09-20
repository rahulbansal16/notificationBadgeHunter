const getHost = () => {
    let host = window.location.host
    host = host.replace("www.","")
    return host
}
// #c42523
removeBadges(getHost())
chrome.runtime.onMessage.addListener((request) => {
    console.log('In the Listener for the block-ad ')
    const {type} = request
    if (type === "block-ad"){
        removeBadges(getHost())
    }
})
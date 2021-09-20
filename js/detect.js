const getHost = () => {
    let host = window.location.host
    host = host.replace("www.","")
    return host
}
// #c42523
// removeBadges(getHost())
// const links = document.querySelectorAll('link[rel=icon]')
// console.log('The links are', links)
// href="https://www.redditstatic.com/desktop2x/img/favicon/favicon-32x32.png"
chrome.runtime.onMessage.addListener((request) => {
    console.log('In the Listener for the block-ad ')
    const {type} = request
    if (type === "block-ad"){
        modifyTitle(getHost())
        // const updatedLinks = document.querySelectorAll('link[rel=icon]')
        // for (var i in updatedLinks){
        //     updatedLinks[i].href = links[i].href
        // }
    }
})
console.log(getHost())
var style = document.documentElement.appendChild(document.createElement('style'));
style.textContent = generateCSSRule(getHost());
// style.textContent = '.indicator-badge {display:none !important;}';
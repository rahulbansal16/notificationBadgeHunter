const getHost = () => {
    let host = window.location.host
    host = host.replace("www.","")
    return host
}
removeBadges(getHost())

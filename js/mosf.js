// console.log("The mosf is getting executed");
(function (xhr) {
  var XHR = XMLHttpRequest.prototype;
  var send = XHR.send;

  XHR.send = function (postData) {
    // console.log('In the send method')
    return new Promise((resolve, reject) => {
      setTimeout( () => {
        resolve(send.apply(this, arguments))
          }, 5000)
      })
  };

})(XMLHttpRequest);

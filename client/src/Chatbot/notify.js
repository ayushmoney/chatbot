    navigator.serviceWorker.register('./sw.js')
    function showNotification(){
        console.log('function called');
      Notification.requestPermission(function(result) {
        if (result === 'granted') {
            console.log('function called : yes');
            navigator.serviceWorker.ready.then(function(registration) {
                registration.showNotification('Message from admin', {
                  body: 'Buzz! Buzz!'
                });
              });
        }
      });
    }
    export default showNotification;
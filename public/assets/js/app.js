if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/service-worker.js").then(register => {
      console.log('Register succeeded in scope : ', register.scope)
    })
  })
} else {
  console.log('Service worker not support.')
}

if (!('Notification' in window)) {
  console.log("This browser does not support desktop notification")
}

else if (Notification.permission === 'granted') {
  const notification = new Notification("Hello", {
    body: 'This is push notification.',
    icon: 'assets/images/logo.png',
  })
}

else if (Notification.permission !== 'denied' || Notification.permission === 'default') {
  Notification.requestPermission(permission => {
    if (permission === 'granted') {
      const notification = new Notification("Welcome", {
        body: 'This is push notification.',
        icon: 'assets/images/logo.png',
      })
    }
  })
}
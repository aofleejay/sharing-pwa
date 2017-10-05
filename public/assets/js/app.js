if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/service-worker.js").then(register => {
      console.log('Register succeeded in scope : ', register.scope)
    })
  })
} else {
  console.log('Service worker not support.')
}

(function($){
  $(function(){
    $('.button-collapse').sideNav()
    $('.parallax').parallax()
  })
})(jQuery)

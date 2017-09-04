fetch('https://script.googleusercontent.com/macros/echo?user_content_key=dyLNhh44QmDindEIB4XjYHvbw9lGAhFrBzDmg9wg9yIMb7vDnMoK89SlxZBUEQ1oUCeywvZ1oRpg29SZVB6n-FnYOj-0_Z9jm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnJ9GRkcRevgjTvo8Dc32iw_BLJPcPfRdVKhJT5HNzQuXEeN3QFwl2n0M6ZmO-h7C6eIqWsDnSrEd&lib=MwxUjRcLr2qLlnVOLh12wSNkqcO1Ikdrk')
.then(res => res.json())
.then(time => {
  document.getElementById('time').innerHTML = time.fulldate
})

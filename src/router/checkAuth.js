function checkAuth (to, from, next) {
  if (localStorage.currentAccount === undefined) {
    next({ name: 'Login' })
  } else {
    next()
  }
}

function checkIsLogin (to, from, next) {
  if (localStorage.currentAccount) {
    next({ name: 'Manage Reservation' })
  } else {
    next()
  }
}

function checkIsManager (to, from, next) {
  const user = JSON.parse(localStorage.currentAccount)
  if (user.role === 'MANAGER') {
    next()
  } else {
    next(false)
  }
}

function checkIsStaff (to, from, next) {
  const user = JSON.parse(localStorage.currentAccount)
  if (user.role === 'STAFF') {
    next()
  } else {
    next(false)
  }
}

export { checkAuth, checkIsLogin, checkIsManager, checkIsStaff }

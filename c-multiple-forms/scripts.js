const inputs = document.querySelectorAll('input, select, textarea')

function togglePasswords(event) {
  if (!event.target.matches('[data-password]')) return

  const passwords = document.querySelectorAll(
    event.target.getAttribute('data-password')
  )

  for (let pw of passwords) {
    pw.type = event.target.checked ? 'text' : 'password'
  }
}

for (let input of inputs) {
  // the invalid event fires before submit
  // add error class
  input.addEventListener('invalid', () => {
    input.classList.add('error')
  })

  input.addEventListener('blur', () => {
    input.checkValidity()
  })
}

document.addEventListener('change', togglePasswords)

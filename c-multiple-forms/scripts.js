const passwordCheckboxes = document.querySelectorAll('[type="checkbox"]')
const [...passwordFields] = document.querySelectorAll('[type="password"]')

console.log('passwordFields:::  ', passwordFields)
passwordFields.forEach((f) => console.log('  ', f.id))

function toggleDisplayPasswords() {
  if (event.target.matches('[name="show-password"]')) {
    let tempe = passwordFields.filter((field) => {
      console.log('  ', field.id)
      field.id === '#password'
    })
    console.log(' tempe ', tempe)
    passwordFields[0].type =
      passwordFields[0].type === 'password' ? 'text' : 'password'
  }
  if (event.target.matches('[name="show-passwords"]')) {
    passwordFields[1].type =
      passwordFields[1].type === 'password' ? 'text' : 'password'
    passwordFields[2].type =
      passwordFields[2].type === 'password' ? 'text' : 'password'
  }
}

document.addEventListener('click', toggleDisplayPasswords)

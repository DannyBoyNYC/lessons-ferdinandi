const inputs = document.querySelectorAll('input, select, textarea');

function togglePasswords(event) {
  if (!event.target.matches('[data-password]')) return;

  // My original solution
  // const passwords = document.querySelectorAll(
  //   event.target.getAttribute('data-password')
  // )

  // Chris' solution - probably just more readable
  const selector = event.target.getAttribute('data-password');
  const passwords = document.querySelectorAll(selector);

  for (let pw of passwords) {
    pw.type = event.target.checked ? 'text' : 'password';
  }
}

for (let input of inputs) {
  // the invalid event fires before submit
  // +++ add error class
  input.addEventListener('invalid', () => {
    input.classList.add('error');
  });

  input.addEventListener('blur', () => {
    input.checkValidity();
  });
}

document.addEventListener('change', togglePasswords);

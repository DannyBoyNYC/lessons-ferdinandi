(function (window, document, undefined) {
  const loginForm = document.querySelector('#login');
  const passwordFields = loginForm.querySelectorAll('[type="password"]');
  const togglePasswordsCheckbox = loginForm.querySelector('#show-passwords');

  const [button1, button2] = document.querySelectorAll('[type="password"]');
  console.log('desructured:::', button1, button2);

  function handleChange(e) {
    if (!e.target.matches('#show-passwords')) return;
    for (let passwordField of passwordFields) {
      if (togglePasswordsCheckbox.checked) {
        passwordField.type = 'text';
      } else {
        passwordField.type = 'password';
      }
    }
  }

  function handleInput(e) {
    if (!e.target.matches('[type="password"]')) return;
    toggleDisablePasswordCheckbox();
  }

  function handleSubmit(e) {
    e.preventDefault();
    loginForm.reset();
    togglePasswordsCheckbox.disabled = true;
  }

  function toggleDisablePasswordCheckbox() {
    for (let passwordField of passwordFields) {
      togglePasswordsCheckbox.disabled =
        passwordField.value.length > 0 ? false : true;
    }
  }

  document.addEventListener('change', handleChange);
  document.addEventListener('input', handleInput);
  document.addEventListener('submit', handleSubmit);
})(window, document);

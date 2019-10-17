// (function(window, document, undefined) {
//   'use strict';

const passwordFields = Array.from(
  document.querySelectorAll('input[type="password"]'),
);

document.addEventListener('change', changeHandler, false);

function changeHandler() {
  if (!event.target.matches('#show-passwords')) return;
  const isToggled = event.target.checked;

  if (isToggled) {
    passwordFields.forEach(function(passwordField) {
      passwordField.setAttribute('type', 'text');
    });
  } else {
    passwordFields.forEach(function(passwordField) {
      passwordField.setAttribute('type', 'password');
    });
  }
}
// })(window, document);

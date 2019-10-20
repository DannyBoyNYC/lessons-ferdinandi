(function(window, document, undefined) {
  'use strict';

  function changeHandler() {
    if (!event.target.matches('#show-password, #show-passwords')) return;
    let isToggled = event.target.checked;
    let currForm = event.target.closest('form');

    if (isToggled) {
      currForm
        .querySelectorAll('input[type="password"]')
        .forEach(field => field.setAttribute('type', 'text'));
    } else {
      currForm
        .querySelectorAll('input[type="text"]')
        .forEach(field => field.setAttribute('type', 'password'));
    }
  }

  document.addEventListener('DOMContentLoaded', () => {
    document
      .querySelectorAll('[type="checkbox"]')
      .forEach(checkbox => (checkbox.checked = false));
  });

  document.addEventListener('change', changeHandler, false);
})(window, document);

(function(window, document, undefined) {
  'use strict';

  document.addEventListener('click', clickHandler, false);

  const passWordField = document.querySelector('#password');

  function clickHandler(event) {
    if (!event.target.matches('i')) return;

    let classes = event.target.classList;
    let result = classes.contains('selected');

    if (result) {
      event.target.classList.remove('selected');
      passWordField.setAttribute('type', 'password');
    } else {
      event.target.classList.add('selected');
      passWordField.setAttribute('type', 'text');
    }
  }
})(window, document);

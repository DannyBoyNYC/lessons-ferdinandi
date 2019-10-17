(function(window, document, undefined) {
  'use strict';

  document.addEventListener('click', clickHandler, false);

  function clickHandler(event) {
    if (!event.target.matches('i')) return;

    let classes = event.target.classList;
    let result = classes.contains('selected');

    if (result) {
      event.target.classList.remove('selected');
      document.querySelector('#password').setAttribute('type', 'password');
    } else {
      event.target.classList.add('selected');
      document.querySelector('#password').setAttribute('type', 'text');
    }
  }
})(window, document);

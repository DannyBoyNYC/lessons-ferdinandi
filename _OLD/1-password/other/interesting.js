document.addEventListener(
  'DOMContentLoaded',
  () => {
    /**
     * Element.matches() polyfill (simple version)
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/matches#Polyfill
     */
    if (!Element.prototype.matches) {
      Element.prototype.matches =
        Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
    }

    // Create a const Toggle
    window.addEventListener(
      'click',
      event => {
        // Toggle aria-pressed
        if (event.target.matches('[aria-pressed]')) {
          let pressed = event.target.getAttribute('aria-pressed') === 'true';
          event.target.setAttribute('aria-pressed', !pressed);
        }

        function toggleType(elm) {
          if (elm.type === 'password') {
            elm.type = 'text';
          } else {
            elm.type = 'password';
          }
          // return elm;
        }

        // Toggle password type='text' || type='password'
        if (event.target.matches('[type="checkbox"]')) {
          console.log('one ', event.target);
          if (event.target.matches('[id="show-password"]')) {
            console.log('two ', event.target);
            const password = document.querySelector('#password');

            toggleType(password);
          }

          if (event.target.matches('[id="show-passwords"]')) {
            const currentPassword = document.querySelector('#current-password');

            toggleType(currentPassword);

            const newPassword = document.querySelector('#new-password');

            toggleType(newPassword);
          }
        }
      },
      false,
    );
  },
  false,
);

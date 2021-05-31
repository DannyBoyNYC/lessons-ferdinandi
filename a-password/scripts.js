(function (window, document, undefined) {
  "use strict";

  window.addEventListener("click", handleClicks);
  window.addEventListener("input", handleInput);

  const usernameField = document.querySelector("#username");
  const passwordField = document.querySelector("#password");
  const togglePasswordCheckbox = document.querySelector("#show-password");
  const submitButton = document.querySelector("button");

  function handleClicks(e) {
    if (e.target.id === "show-password") {
      passwordField.type = togglePasswordCheckbox.checked ? "text" : "password";
    }
  }

  function handleInput(e) {
    if (e.target.id === "password") {
      if (passwordField.value.length > 0) {
        togglePasswordCheckbox.disabled = false;
      } else {
        togglePasswordCheckbox.disabled = true;
      }
    }

    if (passwordField.value.length > 0 && usernameField.value.length > 0) {
      submitButton.disabled = false;
    } else {
      submitButton.disabled = true;
    }
  }
})(window, document);

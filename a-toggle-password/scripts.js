;(function (window, document, undefined) {
  'use strict'

  window.addEventListener('click', handleClicks)
  window.addEventListener('input', handleInput)
  window.addEventListener('submit', handleSubmit)

  const loginForm = document.querySelector('#login')
  const usernameField = loginForm.querySelector('#username')
  const passwordField = loginForm.querySelector('#password')
  const togglePasswordCheckbox = loginForm.querySelector('#show-password')
  const submitButton = loginForm.querySelector('button')

  /**
   * handler functions for all event listeners
   */
  function handleClicks(e) {
    if (e.target.id === 'show-password') {
      passwordField.type = togglePasswordCheckbox.checked ? 'text' : 'password'
    }
  }

  function handleInput(e) {
    e.target.id === 'password' && toggleDisablePasswordCheckbox()
    toggleDisableSubmitButton()
  }

  function handleSubmit(e) {
    resetForm()
    e.preventDefault()
  }

  /**
   * functions called by handler functions
   */
  function toggleDisablePasswordCheckbox() {
    togglePasswordCheckbox.disabled =
      passwordField.value.length > 0 ? false : true
  }

  function toggleDisableSubmitButton() {
    passwordField.value.length > 0 && usernameField.value.length > 0
      ? (submitButton.disabled = false)
      : (submitButton.disabled = true)
  }

  function resetForm() {
    loginForm.reset()
    submitButton.disabled = true
    togglePasswordCheckbox.disabled = true
  }
})(window, document)

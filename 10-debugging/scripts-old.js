// Listen for clicks in the document
document.addEventListener('click', function (event) {
	// Check if a password selector was clicked
	var selector = event.target.getAttribute('data-show-pw');
	console.log(event.target)
	// @debug Uncaught ReferenceError: selectors is not defined
	// if (!selectors) return;
	if (!selector) return;
	
	// Get the passwords
	var passwords = document.querySelectorAll(selector);
	console.log(passwords)
	// Toggle visibility
	Array.from(passwords).forEach(function (password) {
		if (event.target.checked === true) {
			// @debug typo ==== isn't part of JS? Changed to ===
			// password.type ==== 'text';
			// @debug error trying to set an attribute via direct manipulation
			// use setAttribute instead
			// password.type === 'text';
			console.log(password)
			password.setAttribute('type', 'text')
			// console.log(password)
		} else {
			password.type = 'password';
		}
	});
}, false);
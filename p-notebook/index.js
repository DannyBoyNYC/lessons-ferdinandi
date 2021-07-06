import {sanitizeHTML} from '../modules/sanitize.js';

let noteForm = document.getElementById('notebook');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');
let txtArea = document.getElementById('note');

function handleClicks(event) {
  event.preventDefault();
  if (event.target.matches('#saveBtn')) {
    let data = sanitizeHTML(txtArea.value);
    // let noteId = Date.now();
    localStorage.setItem('myNote', data);
    showStatus('saved');
    validate();
  }
  if (event.target.matches('#deleteBtn')) {
    localStorage.removeItem('myNote');
    txtArea.value = '';
    showStatus('deleted');
    validate();
  }
}

function loadNote() {
  validate();
  let note = localStorage.getItem('myNote');
  txtArea.value = note;
}

function validate() {
  if (!localStorage.getItem('myNote')) {
    saveBtn.disabled = true;
    deleteBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
    deleteBtn.disabled = false;
  }
  if (txtArea.value.length > 1) {
    saveBtn.disabled = false;
  }
}

function showStatus(action) {
  let notification = document.createElement('div');
  notification.setAttribute('aria-live', 'polite');
  notification.classList.add('toast');

  noteForm.append(notification);

  setTimeout(function () {
    notification.classList.add('visible');
    if (action === 'saved') {
      notification.textContent = 'Your note was saved!';
    }
    if (action === 'deleted') {
      notification.textContent = 'Your note was deleted!';
    }
  }, 1);

  setTimeout(function () {
    notification.classList.remove('visible');
    notification.remove();
  }, 4000);
}

noteForm.addEventListener('click', handleClicks);
txtArea.addEventListener('keyup', validate);
window.addEventListener('load', loadNote);
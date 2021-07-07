// import {sanitizeHTML} from '../modules/sanitize.js';

let titleInput = document.getElementById('title');
let txtArea = document.getElementById('note');
let notebook = document.getElementById('notebook');
let saveBtn = document.getElementById('saveBtn');
let deleteBtn = document.getElementById('deleteBtn');


function handleSubmit(event) {
  event.preventDefault();
    let formData = new FormData(notebook);
    let noteObj = {};
    for (let [key, value] of formData) {
      noteObj[key] = value;
    }
    // let noteId = Date.now();
    localStorage.setItem('myNote', JSON.stringify(noteObj));
    showStatus('saved');
    validate();
}

function handleClicks(event){
  if (event.target.matches('#deleteBtn')) {
      localStorage.removeItem('myNote');
      titleInput.value = '';
      txtArea.value = '';
      showStatus('deleted');
      validate();
    }
}

function loadNote() {
  validate();
  let currNote = localStorage.getItem('myNote');
  if(!currNote) return;
  let parsedNote = JSON.parse(currNote);
  titleInput.value = parsedNote.noteTitle;
  txtArea.value = parsedNote.noteContent;
}

function validate() {
  if (!localStorage.getItem('myNote')) {
    saveBtn.disabled = true;
    deleteBtn.disabled = true;
  } else {
    saveBtn.disabled = false;
    deleteBtn.disabled = false;
  }
  if (titleInput.value.length > 1 && txtArea.value.length > 1) {
    saveBtn.disabled = false;
  }
}

function showStatus(action) {
  let notification = document.createElement('div');
  notification.setAttribute('aria-live', 'polite');
  notification.classList.add('toast');
  notebook.append(notification);

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

notebook.addEventListener('submit', handleSubmit);
deleteBtn.addEventListener('click', handleClicks);
notebook.addEventListener('keyup', validate);
window.addEventListener('load', loadNote);
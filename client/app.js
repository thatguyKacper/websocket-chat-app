
const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

let userName = '';

function handleLogin(event) {
  event.preventDefault();
  if (!userNameInput.value) {
    alert('Empty field!')
  }
  else {
    userName = userNameInput.value;
    loginForm.classList.remove('show');
    messagesSection.classList.add('show');
  }
}

loginForm.addEventListener('submit', handleLogin);

function addMessage(author, content) {
  const message = document.createElement('li');
  message.classList.add('message');
  message.classList.add('message--received');
  if (author === userName) message.classList.add('message--self');
  message.innerHTML = `
    <h3 class="message__author">${userName === author ? 'You' : author}</h3>
    <div class="message__content">
      ${content}
    </div>
  `;
  messagesList.appendChild(message);
}

function handleSendMessage(event) {
  event.preventDefault();
  if (!messageContentInput.value) {
    alert('Empty field!');
  }
  else {
    addMessage(userName, messageContentInput.value);
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', handleSendMessage);

const loginForm = document.getElementById('welcome-form');
const messagesSection = document.getElementById('messages-section');
const messagesList = document.getElementById('messages-list');
const addMessageForm = document.getElementById('add-messages-form');
const userNameInput = document.getElementById('username');
const messageContentInput = document.getElementById('message-content');

const socket = io();
socket.on('message', ({ author, content }) => addMessage(author, content));
socket.on('join', name => addMessage('Chat Bot', `<i><b>${name}</b> has joined the conversation!</i>`));
socket.on('leave', name => addMessage('Chat Bot', `<i><b>${name}</b> has left the conversation... :(</i>`));

let userName = '';

function handleLogin(event) {
  event.preventDefault();
  if (!userNameInput.value) {
    alert('Empty field!')
  }
  else {
    userName = userNameInput.value;
    socket.emit('join', userName)
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

  let messageContent = messageContentInput.value;

  if (!messageContent.length) {
    alert('You have to type something!');
  }
  else {
    addMessage(userName, messageContent);
    socket.emit('message', { author: userName, content: messageContent })
    messageContentInput.value = '';
  }
}

addMessageForm.addEventListener('submit', handleSendMessage);
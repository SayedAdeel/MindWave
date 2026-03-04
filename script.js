const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter') sendMessage();
});

function sendMessage() {
  const message = userInput.value.trim();
  if(message === '') return;

  addMessage('user', message);
  userInput.value = '';

  // Fake AI response
  setTimeout(() => {
    addMessage('bot', "MindWave 🤖 says: " + message.split('').reverse().join(''));
  }, 500);
}

function addMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

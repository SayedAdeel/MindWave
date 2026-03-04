const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// Apni OpenAI API key
const OPENAI_API_KEY = "YAHAN_APNI_KEY_DALO";  // <-- yahan paste karo

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e){
  if(e.key === 'Enter') sendMessage();
});

async function sendMessage() {
  const message = userInput.value.trim();
  if(message === '') return;

  addMessage('user', message);
  userInput.value = '';

  // Call OpenAI API
  const reply = await getAIResponse(message);
  addMessage('bot', reply);
}

function addMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

async function getAIResponse(message) {
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return "Sorry, MindWave is having trouble replying right now.";
  }
}

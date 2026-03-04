const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// ✅ Apni OpenAI API key yahan paste karo
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // <-- Replace this with your API key

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') sendMessage();
});

// Send message function
async function sendMessage() {
  const message = userInput.value.trim();
  if (message === '') return;

  addMessage('user', message); // Show user message
  userInput.value = '';

  const reply = await getAIResponse(message); // Call OpenAI API
  addMessage('bot', reply); // Show AI response
}

// Function to display messages
function addMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to call OpenAI API
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
        messages: [
          { role: "system", content: "You are MindWave AI. Reply in a friendly and helpful way. Answer in English or Hindi based on user input." },
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  } catch (error) {
    console.error(error);
    return "Sorry, MindWave is having trouble replying right now.";
  }
}

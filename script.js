// -------------------------
// MindWave Script JS
// -------------------------

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendBtn = document.getElementById('send-btn');

// -------------------------
// Config
// -------------------------
const OPENAI_API_KEY = "YOUR_OPENAI_API_KEY"; // <-- Replace with your key

// -------------------------
// Event Listeners
// -------------------------
sendBtn.addEventListener('click', handleSend);
userInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });

// -------------------------
// Functions
// -------------------------

// Handle send button or Enter press
async function handleSend() {
  const message = userInput.value.trim();
  if (!message) return;

  addMessage('user', message);
  userInput.value = '';

  // Call AI response
  const reply = await getAIResponse(message);
  addMessage('bot', reply);
}

// Display message in chat box
function addMessage(sender, message) {
  const msgDiv = document.createElement('div');
  msgDiv.classList.add('chat-message', sender === 'user' ? 'user-msg' : 'bot-msg');
  msgDiv.textContent = message;
  chatBox.appendChild(msgDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// -------------------------
// AI Response
// -------------------------
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
    console.error("AI Response Error:", error);
    return "Sorry, MindWave is having trouble replying right now.";
  }
}

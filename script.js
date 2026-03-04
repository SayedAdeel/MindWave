const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);

function sendMessage() {
    const message = userInput.value.trim();
    if (message === "") return;

    addMessage("You", message);
    userInput.value = "";

    setTimeout(() => {
        const reply = getBotReply(message);
        addMessage("Bot", reply);
    }, 500);
}

function addMessage(sender, text) {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getBotReply(message) {
    message = message.toLowerCase();

    if (message.includes("hello") || message.includes("hi")) {
        return "Hello Adil 👋 How can I help you?";
    }

    if (message.includes("math")) {
        return "Math is important! Which chapter do you need help with?";
    }

    if (message.includes("science")) {
        return "Science is amazing 🔬 What topic?";
    }

    if (message.includes("who made you")) {
        return "I was created by Adil 😎";
    }

    if (message.includes("bye")) {
        return "Goodbye! Come back soon 👋";
    }

    return "I am still learning 🤖 Please ask something about studies.";
}

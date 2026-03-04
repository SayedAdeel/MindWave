const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const chatBox = document.getElementById("chat-box");

sendBtn.addEventListener("click", sendMessage);
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

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

    // Greetings
    if (message.includes("hello") || message.includes("hi") || message.includes("hii") || message.includes("namaste")) {
        return "Hello 👋 Namaste! Main tumhari help ke liye yahan hoon. How can I help you?";
    }

    // How are you
    if (message.includes("kaise ho") || message.includes("how are you")) {
        return "Main bilkul theek hoon 😄 I'm doing great! Tum kaise ho?";
    }

    // Math
    if (message.includes("math") || message.includes("ganit")) {
        return "Math/Ganit ka kaunsa chapter chahiye? Batao, I will try to help 📘";
    }

    // Science
    if (message.includes("science") || message.includes("vigyan")) {
        return "Science/Vigyan bahut interesting hai 🔬 Which topic do you want to learn?";
    }

    // Who made you
    if (message.includes("who made you") || message.includes("tumhe kisne banaya")) {
        return "Mujhe Adil ne banaya hai 😎 I'm proudly created by you!";
    }

    // Bye
    if (message.includes("bye")) {
        return "Bye 👋 Phir milte hain! See you soon.";
    }

    return "Main Hindi aur English dono samajhta hoon 😊 You can ask me about studies.";
}

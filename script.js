document.addEventListener("DOMContentLoaded", function () {

const API_KEY = "AIzaSyAPocUTPwrTxI1r6ynY96-KpGJhhFwc-Xo; // 👈 YAHAN APNI API KEY DALO

const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.classList.add("message", type);
    msg.textContent = text;
    chat.appendChild(msg);
    chat.scrollTop = chat.scrollHeight;
}

async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;

    addMessage(text, "user");
    input.value = "";
    addMessage("Thinking...", "bot");

    try {
        const response = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    contents: [{
                        parts: [{ text: text }]
                    }]
                })
            }
        );

        const data = await response.json();
        chat.removeChild(chat.lastChild);

        if (data.candidates && data.candidates.length > 0) {
            const reply = data.candidates[0].content.parts[0].text;
            addMessage(reply, "bot");
        } else {
            addMessage("No response from AI 😢", "bot");
        }

    } catch (error) {
        chat.removeChild(chat.lastChild);
        addMessage("API Error 😢 Check your key or billing.", "bot");
    }
}

send.addEventListener("click", sendMessage);

input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

});

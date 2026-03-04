const chat = document.getElementById("chat");
const input = document.getElementById("input");

// Enter key support
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") send();
});

function send() {
    const text = input.value.trim();
    if (!text) return;

    addMessage("user", text);
    input.value = "";

    showTyping();

    setTimeout(() => {
        removeTyping();
        const reply = getReply(text);
        addMessage("bot", reply);
    }, 1000);
}

function addMessage(type, text) {
    const div = document.createElement("div");
    div.classList.add("msg", type);
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function showTyping() {
    const div = document.createElement("div");
    div.id = "typing";
    div.classList.add("msg", "bot", "typing");
    div.innerText = "MindWave is typing...";
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function removeTyping() {
    const t = document.getElementById("typing");
    if (t) t.remove();
}

function getReply(msg) {
    msg = msg.toLowerCase();

    // Basic Conversation
    if (msg.includes("your name") || msg.includes("tumhara naam"))
        return "Mera naam MindWave Study AI hai 🤖";

    if (msg.includes("who made you") || msg.includes("kisne banaya"))
        return "Mujhe Adil ne banaya hai 😎🔥";

    if (msg.includes("hello") || msg.includes("hi"))
        return "Hello 👋 Kaise help karu aaj?";

    if (msg.includes("how are you"))
        return "Main bilkul mast hoon 😄 Tum batao?";

    if (msg.includes("bye"))
        return "Bye 👋 Study hard and grow 🚀";

    // Study Section
    if (msg.includes("math"))
        return "Math me algebra, geometry, trigonometry help karta hoon 📐";

    if (msg.includes("area of circle"))
        return "Area of circle = πr²";

    if (msg.includes("science"))
        return "Science me Physics, Chemistry, Biology aate hain 🔬";

    if (msg.includes("photosynthesis"))
        return "Photosynthesis: Plants sunlight se food banate hain 🌱";

    if (msg.includes("noun"))
        return "Noun kisi person, place ya thing ka naam hota hai.";

    // Default reply
    return "Main study aur general questions dono ka jawab de sakta hoon 😊";
}

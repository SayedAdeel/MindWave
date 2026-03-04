document.addEventListener("DOMContentLoaded", function () {

    const sendBtn = document.getElementById("send");
    const input = document.getElementById("input");
    const chat = document.getElementById("chat");

    sendBtn.addEventListener("click", function () {

        const message = input.value.trim();

        if (message === "") return;

        // User message
        const userMsg = document.createElement("div");
        userMsg.textContent = "You: " + message;
        userMsg.style.margin = "10px 0";
        chat.appendChild(userMsg);

        // Bot reply
        const botMsg = document.createElement("div");
        botMsg.textContent = "Bot: I received your message!";
        botMsg.style.margin = "10px 0";
        botMsg.style.color = "#2563eb";
        chat.appendChild(botMsg);

        input.value = "";
        chat.scrollTop = chat.scrollHeight;

    });

});

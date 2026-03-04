const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

window.onload = function() {
    loadChat();
};

userInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") sendMessage();
});

function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;

    addMessage("user", message);
    userInput.value = "";
    showTyping();

    setTimeout(()=>{
        removeTyping();
        const reply = getBotReply(message);
        addMessage("ai", reply);
        saveChat();
    },1000);
}

function addMessage(sender,text){
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping(){
    const div = document.createElement("div");
    div.id="typing";
    div.classList.add("message","ai");
    div.innerText="Typing...";
    chatBox.appendChild(div);
}

function removeTyping(){
    const t=document.getElementById("typing");
    if(t) t.remove();
}

function getBotReply(message){
    message = message.toLowerCase();

    if(message.includes("hello")||message.includes("hi"))
        return "Hello 👋 Kaunsi class aur subject chahiye?";

    if(message.includes("class"))
        return "Main class 1 se 12 tak help kar sakta hoon 📚 Subject batao.";

    if(message.includes("math")||message.includes("ganit"))
        return "Math me algebra, geometry, trigonometry aata hai 📐 Topic batao.";

    if(message.includes("algebra"))
        return "Example: 2x+3=7 → x=2.";

    if(message.includes("area of circle"))
        return "Area of circle = πr².";

    if(message.includes("science"))
        return "Science me Physics, Chemistry, Biology aate hain 🔬";

    if(message.includes("photosynthesis"))
        return "Plants sunlight se food banate hain 🌱";

    if(message.includes("noun"))
        return "Noun kisi person, place ya thing ka naam hota hai.";

    if(message.includes("bye"))
        return "Bye 👋 Study hard and grow 🚀";

    return "Main Hindi aur English dono samajhta hoon 😊 Subject likho.";
}

function toggleMode(){
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}

function saveChat(){
    localStorage.setItem("chatData", chatBox.innerHTML);
}

function loadChat(){
    const saved = localStorage.getItem("chatData");
    if(saved) chatBox.innerHTML = saved;
}

function startVoice(){
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang="en-IN";
    recognition.start();
    recognition.onresult=function(e){
        userInput.value = e.results[0][0].transcript;
        sendMessage();
    };
}

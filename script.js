const authBox = document.getElementById("auth-box");
const chatSystem = document.getElementById("chat-system");
const welcomeUser = document.getElementById("welcome-user");
const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

window.onload = function() {
    if(localStorage.getItem("loggedInUser")){
        showChat(localStorage.getItem("loggedInUser"));
    }
};

function signup(){
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if(!user || !pass) return alert("Fill all fields");

    localStorage.setItem("user_"+user, pass);
    alert("Signup Successful! Now Login.");
}

function login(){
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const storedPass = localStorage.getItem("user_"+user);

    if(storedPass === pass){
        localStorage.setItem("loggedInUser", user);
        showChat(user);
    } else {
        alert("Wrong Username or Password");
    }
}

function logout(){
    localStorage.removeItem("loggedInUser");
    location.reload();
}

function showChat(user){
    authBox.style.display="none";
    chatSystem.style.display="block";
    welcomeUser.innerText="Welcome, "+user+" 🤖";
    loadChat();
}

userInput?.addEventListener("keypress", function(e){
    if(e.key==="Enter") sendMessage();
});

function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;

    addMessage("user", message);
    userInput.value="";
    showTyping();

    setTimeout(()=>{
        removeTyping();
        const reply = getBotReply(message);
        addMessage("ai", reply);
        saveChat();
    },1000);
}

function addMessage(sender,text){
    const div=document.createElement("div");
    div.classList.add("message",sender);
    div.innerText=text;
    chatBox.appendChild(div);
    chatBox.scrollTop=chatBox.scrollHeight;
}

function showTyping(){
    const div=document.createElement("div");
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
    message=message.toLowerCase();

    if(message.includes("hello")||message.includes("hi"))
        return "Hello 👋 Kaunsi class aur subject chahiye?";

    if(message.includes("math"))
        return "Math me algebra, geometry, trigonometry aata hai 📐";

    if(message.includes("science"))
        return "Science me Physics, Chemistry, Biology hote hain 🔬";

    if(message.includes("noun"))
        return "Noun kisi person, place ya thing ka naam hota hai.";

    if(message.includes("photosynthesis"))
        return "Plants sunlight se food banate hain 🌱";

    if(message.includes("bye"))
        return "Bye 👋 Study hard and grow 🚀";

    return "Main Hindi aur English dono samajhta hoon 😊";
}

function toggleMode(){
    document.body.classList.toggle("light");
    document.body.classList.toggle("dark");
}

function saveChat(){
    localStorage.setItem("chatData",chatBox.innerHTML);
}

function loadChat(){
    const saved=localStorage.getItem("chatData");
    if(saved) chatBox.innerHTML=saved;
}

function startVoice(){
    const recognition=new (window.SpeechRecognition||window.webkitSpeechRecognition)();
    recognition.lang="en-IN";
    recognition.start();
    recognition.onresult=function(e){
        userInput.value=e.results[0][0].transcript;
        sendMessage();
    };
}

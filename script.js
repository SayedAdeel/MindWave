const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");

userInput.addEventListener("keypress", function(e){
    if(e.key === "Enter") sendMessage();
});

function sendMessage(){
    const message = userInput.value.trim();
    if(!message) return;

    addMessage("user", message);
    userInput.value = "";

    setTimeout(()=>{
        const reply = getReply(message);
        addMessage("ai", reply);
    },700);
}

function addMessage(type,text){
    const div = document.createElement("div");
    div.classList.add("message", type);
    div.innerText = text;
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function getReply(msg){
    msg = msg.toLowerCase();

    if(msg.includes("hello")||msg.includes("hi"))
        return "Hello Adil 👋 Kaunsi class ka doubt hai?";

    if(msg.includes("math"))
        return "Math me algebra, geometry, trigonometry help kar sakta hoon 📐";

    if(msg.includes("area of circle"))
        return "Area of circle = πr²";

    if(msg.includes("science"))
        return "Science me Physics, Chemistry, Biology aate hain 🔬";

    if(msg.includes("photosynthesis"))
        return "Photosynthesis: Plants sunlight se food banate hain 🌱";

    if(msg.includes("noun"))
        return "Noun kisi person, place ya thing ka naam hota hai.";

    if(msg.includes("bye"))
        return "Bye 👋 Study hard 🚀";

    return "Subject clearly likho 😊";
}

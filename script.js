<script>
const chat = document.getElementById("chat");
const input = document.getElementById("input");
const send = document.getElementById("send");

const API_KEY = "PASTE_YOUR_API_KEY_HERE";

send.onclick = sendMessage;
input.addEventListener("keypress", e=>{
    if(e.key==="Enter") sendMessage();
});

function addMessage(text,type){
    const msg = document.createElement("div");
    msg.classList.add("message",type);
    msg.textContent=text;
    chat.appendChild(msg);
    chat.scrollTop=chat.scrollHeight;
}

async function sendMessage(){
    const text = input.value.trim();
    if(!text) return;

    addMessage(text,"user");
    input.value="";

    addMessage("Thinking...","bot");

    const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
            method:"POST",
            headers:{ "Content-Type":"application/json" },
            body:JSON.stringify({
                contents:[{
                    parts:[{ text:text }]
                }]
            })
        }
    );

    const data = await response.json();
    
    chat.removeChild(chat.lastChild);

    if(data.candidates){
        const reply = data.candidates[0].content.parts[0].text;
        addMessage(reply,"bot");
    } else {
        addMessage("Error getting response 😢","bot");
    }
}
</script>

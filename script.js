function generateReply(message){
  const msg = message.toLowerCase();
  const hindiWords = ['kya','kaise','ka','hai','aap','mera','ka haal'];
  const isHindi = hindiWords.some(word => msg.includes(word));

  if(isHindi){
    const replies = [
      "Main thik hoon, aapka kya haal hai?",
      "Bilkul theek hoon, aap kaise ho?",
      "Main theek hoon, aap batao!"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  } else {
    const replies = [
      "I'm fine, how are you?",
      "Doing great! How about you?",
      "I'm good, what about you?"
    ];
    return replies[Math.floor(Math.random() * replies.length)];
  }
}

console.log("Doom Bot: Extension is loaded and watching WhatsApp!");

const GROQ_API_KEY = CONFIG.GROQ_KEY;

async function getBrain(userPrompt) {
    console.log("Doom Bot: Asking the Groq brain...");
    
    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${GROQ_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                // Llama 3 is incredibly fast on Groq
                model: "llama-3.1-8b-instant", 
                messages: [
                    { "role": "system", "content": "You are a funny person. Keep your responses short and friendly for WhatsApp." },
                    { "role": "user", "content": userPrompt }
                ]
            })
        });

        const data = await response.json();

        if(data.error){
            console.error("Doom Bot: Groq AI Error: ", data.error.message);
            return "Error: " + data.error.message;
        }
        
        return data.choices[0].message.content; // Groq follows the OpenAI response format
    }catch (error) {
        console.error("Doom Bot: Groq AI Error!", error);
        return "My circuits are a bit fried right now. HA HA";
    }
}

function getLastIncomingMessage() {
    const main = document.querySelector("#main");
    if(!main) {
        return null;
    }

    const incomingMessages = main.querySelectorAll('.message-in');
    if(incomingMessages.length === 0) return null;
    
    const lastMessage = incomingMessages[incomingMessages.length - 1];
    const textNode = lastMessage.querySelector('.copyable-text span');

    return textNode ? textNode.innerText : null;
}

let lastRepliedMessage = "";

async function handleChatSync() {
    const currentMessage = getLastIncomingMessage();

    // reply if there is a new message and its diff from last
    if(currentMessage && currentMessage !== lastRepliedMessage){
        console.log("Doom Bot: New message detected: " + currentMessage);
        
        lastRepliedMessage = currentMessage; // mark as seen

        const groqResponse = await getBrain(`The user said: "${currentMessage}". Write a short, friendly reply.`);
        await sendMessage(groqResponse);
    }
}

async function sendMessage(text) {
    // 1.finding input box
    const main = document.querySelector("#main");

    // be patient my doom bot, wait for th epage to load
    if (!main) {
        console.error("Doom Bot: No chat is open!");
        return;
    }

    const textarea = main.querySelector('div[contenteditable="true"][role="textbox"]') || 
                     main.querySelector('._ak1l') || 
                     main.querySelector('footer div[contenteditable="true"]');

    if(!textarea){
        console.error("Doom Bot: Could not find input box!");
        setTimeout(() => {
            sendMessage(text);
        }, 1000);
        return;
    }

    // 2.focus and type
    textarea.focus();
    document.execCommand('insertText', false, text);

    // 3.make an input event for the send to apprear
    textarea.dispatchEvent(new Event('input', { bubbles: true }));

    // 4.find and click send
    setTimeout(() => {
        const sendButton = main.querySelector('span[data-icon="send"]') || 
                           main.querySelector('button[aria-label*="Send"]');
        if(sendButton) {
            sendButton.click();
            console.log("Doom Bot: Message sent!");
        } else {
            console.error("Doom Bot: Could not find send button!");
        }
    }, 500);
}

// testing smart waiting
function startAutomation() {
    console.log("Doom Bot: Waiting for you to click a chat...");

    // every 1s check if chat it visible
    const observer = new MutationObserver(() => {
        const main = document.querySelector("#main");

        if(main){
            handleChatSync();
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
}

// testing brain
startAutomation(); 




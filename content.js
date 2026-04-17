console.log("Doom Bot: Extension is loaded and watching WhatsApp!!");

const GROQ_API_KEY = CONFIG.GROQ_KEY;

async function getBrain(history) {
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
                        { 
                            "role": "system", 
                            "content": `You are a female electrical engineering student at UoM (University of Moratuwa).
                            ONLY speak in English. Do not speak other languages. Dont talk too much, be chill.
                            - Tone: Casual, slightly lazy, but smart. 
                            - Vocabulary: Do NOT use "machan", "ban", or "ado". Use "girl" or just direct speech. 
                            - References: You're busy with work, lab reports, and coding projects.
                            - Rules: lowercase only. Keep it short. No formal greetings like "hello" or "dear". 
                            - Personality: If someone asks a dumb question, be slightly sarcastic but nice.` 
                        },
                    // spreading the history array here
                    ...history
                ]
            })
        });

        const data = await response.json();

        if(data.error){
            console.error("Doom Bot: Groq AI Error: ", data.error.message);
            return "Error: " + data.error.message;
        }

        let aiText = data.choices[0].message.content;

        // Remove quotes, lowercase everything, and remove trailing periods
        aiText = aiText.replace(/["']/g, "")
               .toLowerCase()
               .replace(/\.$/, ""); 

        return aiText;
    }catch (error) {
        console.error("Doom Bot: Groq AI Error!", error);
        return "wait what?";
    }
}

// 'power' here represents the number of seconds to simulate typing
function simulateTyping(power = 3) {
    const main = document.querySelector("#main");
    const textarea = main?.querySelector('div[contenteditable="true"][role="textbox"]');

    if (textarea) {
        textarea.focus();
        
        // Start an interval that "taps" the keyboard every 500ms
        // to keep the "Typing..." status alive for the duration of 'power'
        const typingInterval = setInterval(() => {
            const event = new KeyboardEvent('keydown', { bubbles: true });
            textarea.dispatchEvent(event);
        }, 500);

        // Stop the typing indicator after the 'power' duration (in seconds)
        setTimeout(() => {
            clearInterval(typingInterval);
            console.log("Doom Bot: Finished typing simulation.");
        }, power * 1000);
    }
}

function getLastIncomingMessage() {
    const main = document.querySelector("#main");
    if(!main) {
        return null;
    }

    const messages = main.querySelectorAll('.message-in, .message-out');
    const history = [];
    
    const recentMessages = Array.from(messages).slice(-5);

    recentMessages.forEach(msg => {
        const textNode = msg.querySelector('.copyable-text span');
        if(textNode) {
            const role = msg.classList.contains('message-in') ? "user" : "assistant";
            history.push({ 
                role: role, 
                content: textNode.innerText.trim() 
            });
        }
    });

    return history;
}

let lastRepliedMessage = "";

async function handleChatSync() {
    const history = getLastIncomingMessage();
    if (!history || history.length === 0) return;

    const lastMessage = history[history.length - 1];

    // 1. Only reply to the user. 
    // 2. Ensure we haven't already started a reply process for this specific content.
    if (lastMessage.role === "user" && lastMessage.content !== lastRepliedMessage) {
        
        // Lock the message immediately so we don't trigger twice
        lastRepliedMessage = lastMessage.content; 
        console.log("Doom Bot: Thinking...");

        // Start a small initial delay to simulate 'reading' time
        setTimeout(async () => {
            const groqResponse = await getBrain(history);
            
            // Calculate typing duration based on text length
            const typingDuration = Math.min(Math.max(groqResponse.length * 60, 2000), 8000);
            
            // Start the 'Typing...' status
            simulateTyping(typingDuration / 1000); 

            // Send the message only after the typing duration finishes
            setTimeout(async () => {
                await sendMessage(groqResponse);
            }, typingDuration);

        }, 1000); // 1s to 'read' the message
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




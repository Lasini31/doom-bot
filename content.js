console.log("Doom Bot: Extension is loaded and watching WhatsApp!");

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
    const checkInterval = setInterval(() => {
        const main = document.querySelector("#main");

        if(main){
            console.log("Doom Bot: Chat detected! Preparing...");
            clearInterval(checkInterval);
            
            // settling time = 2s
            setTimeout(() => {
                console.log("Doom Bot: Successfully detected! Sending message...");
                sendMessage("Hello from Doom Bot - Extention 001!");
            }, 2000);
        }
    }, 1000);
}

// testing smart waiting
startAutomation(); 

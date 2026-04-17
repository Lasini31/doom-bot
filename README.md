# 🤖 Doom Bot - AI WhatsApp Extension

A high-performance Chrome Extension that transforms WhatsApp Web into an intelligent, context-aware conversational agent. **Doom Bot** bridges the gap between the static browser DOM and the high-speed **Groq Llama 3** inference engine.

---

## 🚀 Evolution: V1 to V2

### **V1: The Foundation**
* **Real-time Injection**: Seamlessly runs within the WhatsApp Web DOM via Content Scripts.
* **Groq Integration**: Powered by Llama 3.1 for near-instant response generation.
* **Basic Automation**: 3-second static delay and `document.execCommand` typing simulation.
* **Manifest V3**: Built on the latest Chrome extension standards for better security and performance.

### **V2: The Intelligence Upgrade (Current)**
* **Conversation Memory**: No longer a "one-shot" bot. V2 scrapes the last 5–10 messages from the DOM to maintain context, allowing for follow-up questions and sarcasm detection.
* **UoM Persona**: Tailored for a **female engineering student at the University of Moratuwa (UoM)**.
    * *Natural Slang:* Naturally integrates terms like "ane," "elakiri," and "shape."
    * *Anti-Bot Tone:* Explicitly avoids "machan/ban/ado," lowercase-only formatting, and no robotic formalisms.
* **Smart Human Simulation**:
    * *Dynamic Delays:* Reading and typing time now scales mathematically based on the character count of the AI's response.
    * *Active "Typing..." Status:* Dispatches trusted keyboard events to trigger the "Typing..." indicator on the recipient's phone.
* **Loop Prevention**: Strictly validates message roles (`message-in`) to ensure the bot never replies to its own messages.

---

## 🛠️ Tech Stack
* **Engine**: [Groq Cloud API](https://groq.com/) (Llama 3.1 - 8b Instant).
* **Runtime**: JavaScript ES6+ (DOM MutationObservers).
* **Sanitization**: Regex-based filters to remove quotation marks and formal punctuation.
* **Config**: Modular `config.js` for local API key management.

---

## 📦 Installation
1.  **Clone** this repository to your local machine.
2.  **API Key Setup**: Create a `config.js` file in the root directory:
    ```javascript
    var CONFIG = { 
        GROQ_KEY: "your_groq_api_key_here" 
    };
    ```
3.  **Load in Chrome**:
    * Navigate to `chrome://extensions/`.
    * Enable **Developer Mode** (top right).
    * Click **Load Unpacked** and select the project folder.
4.  **Launch**: Open [WhatsApp Web](https://web.whatsapp.com) and click on any chat.

---

## 🔮 Roadmap & V3 Master Prompt

V3 will shift from a "hidden script" to a fully-fledged "application" with an integrated UI.

### **The V3 Master Prompt**
Copy and paste this into your LLM to begin the next development phase:

> "I am upgrading **Doom Bot**, a WhatsApp Web AI extension (Manifest V3). 
> 
> **Current state:** It has conversation history (last 10 messages), a UoM female student persona, dynamic typing delays, and uses the Groq API.
>
> **Goal for V3:** > 1. **UI Injection**: Inject a 'Power' toggle button and a 'Status' indicator (Bot Active/Idle) into the WhatsApp header (near the search/menu icons).
> 2. **Group Chat Awareness**: Modify the scraper to detect the sender's name in group chats so the AI can distinguish between multiple people.
> 3. **Smart Triggering**: Implement a 'Trigger Keyword' (e.g., only reply if the message contains 'doom' or if it is a DM).
> 4. **Safety Switch**: Add an emergency 'Stop' hotkey to immediately kill the automation loop.
>
> Provide the steps to inject the CSS/HTML into the WhatsApp DOM and handle the state management for the ON/OFF toggle."

---

## ⚠️ Disclaimer
This project is for educational purposes only. Automating WhatsApp can violate their Terms of Service. Use responsibly and keep rate limits human-like to avoid account flagging.

---
*Developed by El.*

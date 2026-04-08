# 🤖 Doom Bot - AI WhatsApp Extension

A lightweight Chrome Extension that transforms WhatsApp Web into an AI-powered assistant. Doom Bot listens for incoming messages, processes them through a "brain" (Groq AI), and responds with human-like delays.

## 🚀 Features
- **Real-time Injection**: Runs directly within the WhatsApp Web DOM.
- **AI Integration**: Powered by Groq (Llama 3.1) for near-instant responses.
- **Human-like Behavior**: Includes a 3-second response delay and casual formatting (no quotes, natural casing).
- **Multi-chat Support**: Detects when you switch conversations and resets context.

## 🛠️ Tech Stack
- **JavaScript (ES6+)**: DOM Manipulation & Asynchronous Fetch API.
- **Chrome Extension Manifest V3**: The latest standard for browser extensions.
- **Groq Cloud API**: Using Llama 3 models for high-speed inference.

## 📦 Installation
1. Clone this repository.
2. Create a `config.js` file and add your API key:
   ```javascript
   var CONFIG = { GROQ_KEY: "your_key_here" };




---

### Part 2: The "Master Prompt" for Version 2

**The Prompt:**
> "I want to upgrade **Doom Bot**, a Chrome Extension for WhatsApp Web. 
>
> **Current Architecture:**
> - **Manifest V3** using a content script (`content.js`) and a global config (`config.js`).
> - It uses a **MutationObserver** to detect new `.message-in` elements.
> - It has a **3-second delay** and uses `document.execCommand('insertText')` to type.
> - The brain is **Groq AI (Llama 3.1)** via the Fetch API.
>
> **Current Limitations:**
> 1. It only reads the *last* message, so it lacks 'short-term memory' of the whole conversation.
> 2. It struggles if the UI classes change.
> 3. It's not yet intelligent enough to know when *not* to reply.
>
> **Goals for V2:**
> Improve the intelligence by implementing 'Conversation History' (sending the last 5 messages to the AI instead of just 1) and adding a UI toggle button to the WhatsApp header to turn the bot ON/OFF."

// Simple Chatbot using OpenAI API
// Free Alternative: Uses a simple rule-based chatbot (no API key required)
const sendBtn = document.getElementById('sendBtn');
const userInput = document.getElementById('userInput');
const chatbox = document.getElementById('chatbox');

// Rule-based responses (fallback when AI is not enabled)
const botResponses = {
    'hello': 'Hi there! How can I help you today? 😊',
    'hi': 'Hello! What can I do for you?',
    'how are you': 'I\'m doing great, thanks for asking! How about you?',
    'what services': 'I offer: Web Development, UI/UX Design, and Consulting. Which one interests you?',
    'can you help me': 'Of course! I\'d be happy to help. What do you need assistance with?',
    'your skills': 'My skills include: HTML, CSS, JavaScript, React, Node.js, Python, and SQL.',
    'contact': 'You can reach me at your.email@example.com or call +1 (555) 123-4567',
    'price': 'Pricing depends on the project scope. Feel free to email me for a custom quote!',
    'hire you': 'I\'d love to work with you! Please get in touch via email or contact form.',
    'projects': 'I\'ve worked on e-commerce sites, task management apps, and more. Check the "My Works" section!',
    'default': 'That\'s interesting! Tell me more, or ask me about my services!'
};

let PROFILE = null; // loaded from profile.json

// Load profile.json (contains your personal details)
async function loadProfile() {
    try {
        const resp = await fetch('profile.json', { cache: 'no-store' });
        if (!resp.ok) throw new Error('Profile not found');
        PROFILE = await resp.json();
        console.log('Profile loaded:', PROFILE);
    } catch (err) {
        console.warn('Could not load profile.json, using defaults. Error:', err.message);
        PROFILE = null;
    }
}

// Simple rule-based fallback
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    for (let keyword in botResponses) {
        if (lowerMessage.includes(keyword)) {
            return botResponses[keyword];
        }
    }
    return botResponses['default'];
}

// Add message to chatbox
function addMessageToChat(message, className) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${className}`;
    messageDiv.innerHTML = `<p>${escapeHtml(message)}</p>`;
    chatbox.appendChild(messageDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Entry point for sending message. Uses AI if enabled, otherwise rule-based.
async function sendMessage() {
    const message = userInput.value.trim();
    if (message === '') return;
    addMessageToChat(message, 'user-message');
    userInput.value = '';

    // If AI_CONFIG exists and useAI is true and apiKey present, call AI
    if (window.AI_CONFIG && AI_CONFIG.useAI && AI_CONFIG.apiKey) {
        addMessageToChat('Thinking...', 'bot-message');
        try {
            const botResp = await getBotResponseFromAI(message);
            // remove the 'Thinking...' placeholder (last bot-message)
            const botMsgs = chatbox.querySelectorAll('.bot-message');
            if (botMsgs.length) {
                const last = botMsgs[botMsgs.length - 1];
                if (last && last.textContent.trim() === 'Thinking...') {
                    last.remove();
                }
            }
            addMessageToChat(botResp, 'bot-message');
        } catch (err) {
            console.error('AI Error:', err);
            // remove placeholder
            const botMsgs = chatbox.querySelectorAll('.bot-message');
            if (botMsgs.length) botMsgs[botMsgs.length - 1].remove();
            addMessageToChat('Sorry, I could not reach the AI service. Falling back to local responses.', 'bot-message');
            const fallback = getBotResponse(message);
            addMessageToChat(fallback, 'bot-message');
        }
    } else {
        // Fallback
        setTimeout(() => {
            const botResponse = getBotResponse(message);
            addMessageToChat(botResponse, 'bot-message');
        }, 300);
    }
}

// Call AI provider (supports 'openai' and 'huggingface')
async function getBotResponseFromAI(userMessage) {
    // Build a system prompt that includes profile information (if available)
    let systemPrompt = 'You are a helpful assistant for a personal portfolio website. Answer questions about the portfolio owner, their services, and projects. Keep responses concise and friendly.';
    if (PROFILE) {
        systemPrompt += `\nHere is the owner profile (JSON): ${JSON.stringify(PROFILE)}.`;
    }

    const provider = (AI_CONFIG.provider || 'openai').toLowerCase();

    if (provider === 'openai') {
        // Use OpenAI Chat Completions
        const body = {
            model: AI_CONFIG.model || 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            max_tokens: AI_CONFIG.max_tokens || 200
        };

        const resp = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`
            },
            body: JSON.stringify(body)
        });
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`OpenAI error: ${resp.status} ${errText}`);
        }
        const data = await resp.json();
        return data.choices?.[0]?.message?.content?.trim() || 'Sorry, I didn\'t get a response.';
    } else if (provider === 'huggingface') {
        // Example for Hugging Face Inference API (text-generation). Requires model name in AI_CONFIG.model
        const model = AI_CONFIG.model || 'gpt2';
        const prompt = `${systemPrompt}\nUser: ${userMessage}\nAssistant:`;
        const resp = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${AI_CONFIG.apiKey}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ inputs: prompt, parameters: { max_new_tokens: AI_CONFIG.max_tokens || 150 } })
        });
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`HuggingFace error: ${resp.status} ${errText}`);
        }
        const data = await resp.json();
        // HF returns different shapes depending on model; attempt to extract text
        if (Array.isArray(data)) return (data[0]?.generated_text || '').trim();
        return (data?.generated_text || '').trim() || 'Sorry, could not generate an answer.';
    } else if (provider === 'gemini' || provider === 'google') {
        // Google Generative AI (Gemini) via REST API using API key
        // Endpoint: https://generativelanguage.googleapis.com/v1beta2/models/{model}:generate?key=API_KEY
        const model = AI_CONFIG.model || 'text-bison-001';
        const url = `https://generativelanguage.googleapis.com/v1beta2/models/${model}:generate?key=${AI_CONFIG.apiKey}`;
        const promptText = `${systemPrompt}\nUser: ${userMessage}\nAssistant:`;
        const body = {
            prompt: { text: promptText },
            max_output_tokens: AI_CONFIG.max_tokens || 200
        };
        const resp = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (!resp.ok) {
            const errText = await resp.text();
            throw new Error(`Gemini error: ${resp.status} ${errText}`);
        }
        const data = await resp.json();
        // Response usually has candidates array with 'output' or 'content'
        const candidate = data?.candidates?.[0] || data?.output?.[0] || null;
        const text = candidate?.content || candidate?.output || candidate?.text || data?.candidates?.[0]?.message || '';
        return (text || '').trim() || 'Sorry, could not generate an answer.';
    } else {
        throw new Error('Unsupported AI provider: ' + provider);
    }
}

// Event listeners
sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') sendMessage();
});

// Initialize: load profile and try to load ai_config.js (if user created it)
(async function init() {
    await loadProfile();
    // AI_CONFIG may be defined by ai_config.js (user copies example to ai_config.js)
    if (!window.AI_CONFIG) {
        console.log('AI_CONFIG not found. To enable AI, copy ai_config.example.js to ai_config.js and set your API key / provider.');
    }
})();

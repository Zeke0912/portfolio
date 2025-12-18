// Flowise Chatbot Configuration Template
// Copy this file to chatbot-config.js and fill in your actual values

window.CHATBOT_CONFIG = {
    // Flowise Configuration
    chatflowid: 'your-chatflow-id-here',
    apiHost: 'https://cloud.flowiseai.com',

    // Theme Configuration
    theme: {
        button: {
            backgroundColor: '#6366f1',  // Primary indigo color
            right: 20,
            bottom: 20,
            size: 'medium',
            iconColor: 'white',
        },

        chatWindow: {
            welcomeMessage: "Hi! I'm your AI assistant. How can I help you today?",
            backgroundColor: '#ffffff',
            height: 600,
            width: 400,
            fontSize: 16,

            botMessage: {
                backgroundColor: '#f7f8ff',  // Very light indigo
                textColor: '#303235',
            },

            userMessage: {
                backgroundColor: '#6366f1',  // Primary color
                textColor: '#ffffff',
            },

            textInput: {
                placeholder: 'Type your message...',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '#6366f1',  // Primary color
            },

            footer: {
                textColor: '#303235',
                text: 'Powered by',
                company: 'Your Name',
                companyLink: 'https://flowiseai.com'
            }
        }
    },

    // Analytics Configuration
    analytics: {
        enableAnalytics: true,
        enableErrorLogging: true,
        analyticsEndpoint: null, // Set to your analytics endpoint if available
    },

    // Fallback Contact Info
    fallback: {
        email: 'your-email@example.com',
        phone: 'your-phone-number'
    }
};

#!/bin/bash

echo "Generating chatbot-config.js..."

# Set defaults from production values (can be overridden by environment variables)
CHATBOT_CHATFLOW_ID=${CHATBOT_CHATFLOW_ID:-"82f0b30c-3695-47dd-b487-a1e03fc70986"}
CHATBOT_API_HOST=${CHATBOT_API_HOST:-"https://cloud.flowiseai.com"}
CHATBOT_PRIMARY_COLOR=${CHATBOT_PRIMARY_COLOR:-"#6366f1"}
CHATBOT_WELCOME_MESSAGE=${CHATBOT_WELCOME_MESSAGE:-"Hi! I'm Rolly's AI assistant. Ask me about his skills, projects, or services!"}
CHATBOT_COMPANY_NAME=${CHATBOT_COMPANY_NAME:-"Rolly Alonso"}
CHATBOT_FALLBACK_EMAIL=${CHATBOT_FALLBACK_EMAIL:-"rollyalonso88@gmail.com"}
CHATBOT_FALLBACK_PHONE=${CHATBOT_FALLBACK_PHONE:-"09998873858"}

# Check if using environment variables or defaults
if [ -n "$CHATBOT_CHATFLOW_ID_OVERRIDE" ]; then
    echo "Using environment variables from Netlify dashboard"
else
    echo "Using production defaults (set CHATBOT_* environment variables to override)"
fi

# Generate chatbot-config.js
cat > chatbot-config.js << EOF
// Flowise Chatbot Configuration
// Auto-generated from Netlify environment variables

window.CHATBOT_CONFIG = {
    // Flowise Configuration
    chatflowid: '${CHATBOT_CHATFLOW_ID}',
    apiHost: '${CHATBOT_API_HOST}',

    // Theme Configuration
    theme: {
        button: {
            backgroundColor: '${CHATBOT_PRIMARY_COLOR}',
            right: 20,
            bottom: 20,
            size: 'medium',
            iconColor: 'white',
        },

        chatWindow: {
            welcomeMessage: "${CHATBOT_WELCOME_MESSAGE}",
            backgroundColor: '#ffffff',
            height: 600,
            width: 400,
            fontSize: 16,

            botMessage: {
                backgroundColor: '#f7f8ff',
                textColor: '#303235',
            },

            userMessage: {
                backgroundColor: '${CHATBOT_PRIMARY_COLOR}',
                textColor: '#ffffff',
            },

            textInput: {
                placeholder: 'Type your message...',
                backgroundColor: '#ffffff',
                textColor: '#303235',
                sendButtonColor: '${CHATBOT_PRIMARY_COLOR}',
            },

            footer: {
                textColor: '#303235',
                text: 'Powered by',
                company: '${CHATBOT_COMPANY_NAME}',
                companyLink: 'https://flowiseai.com'
            }
        }
    },

    // Analytics Configuration
    analytics: {
        enableAnalytics: true,
        enableErrorLogging: true,
        analyticsEndpoint: null,
    },

    // Fallback Contact Info
    fallback: {
        email: '${CHATBOT_FALLBACK_EMAIL}',
        phone: '${CHATBOT_FALLBACK_PHONE}'
    }
};
EOF

echo "✅ chatbot-config.js generated successfully"
echo "Configuration:"
echo "  - Chatflow ID: ${CHATBOT_CHATFLOW_ID}"
echo "  - API Host: ${CHATBOT_API_HOST}"
echo "  - Primary Color: ${CHATBOT_PRIMARY_COLOR}"
echo "  - Company: ${CHATBOT_COMPANY_NAME}"

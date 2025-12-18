#!/bin/bash

echo "Generating chatbot-config.js from environment variables..."

# Check if required environment variables are set
if [ -z "$CHATBOT_CHATFLOW_ID" ]; then
    echo "ERROR: CHATBOT_CHATFLOW_ID environment variable is not set"
    echo "Please set it in Netlify dashboard under Site settings > Environment variables"
    exit 1
fi

# Set defaults for optional variables
CHATBOT_API_HOST=${CHATBOT_API_HOST:-"https://cloud.flowiseai.com"}
CHATBOT_PRIMARY_COLOR=${CHATBOT_PRIMARY_COLOR:-"#6366f1"}
CHATBOT_WELCOME_MESSAGE=${CHATBOT_WELCOME_MESSAGE:-"Hi! I'm your AI assistant. How can I help you today?"}
CHATBOT_COMPANY_NAME=${CHATBOT_COMPANY_NAME:-"Portfolio"}
CHATBOT_FALLBACK_EMAIL=${CHATBOT_FALLBACK_EMAIL:-"contact@example.com"}
CHATBOT_FALLBACK_PHONE=${CHATBOT_FALLBACK_PHONE:-"N/A"}

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

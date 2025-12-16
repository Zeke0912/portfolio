# FLOWISE CHATBOT INTEGRATION GUIDE

This guide explains how to integrate your Flowise RAG chatbot into your portfolio website.

## INTEGRATION METHODS

There are 3 ways to integrate Flowise chatbot into your website:

### Method 1: Floating Chat Widget (Recommended)
The chatbot appears as a floating button in the bottom-right corner.

### Method 2: Embedded Chat Window
The chatbot is embedded directly in a section of your page.

### Method 3: Full-Screen Chat
The chatbot takes up a dedicated page or modal.

## METHOD 1: FLOATING CHAT WIDGET (IMPLEMENTED)

### Step 1: Get Your Flowise Embed Code
1. Open Flowise dashboard
2. Go to your chatflow
3. Click "Embed" or "Share"
4. Copy the Web Widget code

### Step 2: Replace Placeholder in index.html
1. Open `index.html`
2. Find this comment: `<!-- FLOWISE EMBED CODE - REPLACE THIS SECTION -->`
3. Replace the placeholder script with your actual Flowise embed code

### Example:
```html
<!-- FLOWISE EMBED CODE - REPLACE THIS SECTION -->
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
  Chatbot.init({
    chatflowid: 'your-actual-chatflow-id-here',
    apiHost: 'https://your-actual-flowise-url.com',
    theme: {
      button: {
        backgroundColor: '#3B81F6',
        right: 20,
        bottom: 20,
        size: 'medium',
        iconColor: 'white',
      },
      chatWindow: {
        welcomeMessage: 'Hi! I\'m Rolly\'s AI assistant. Ask me about his skills, projects, or services!',
        backgroundColor: '#ffffff',
        height: 500,
        width: 400,
        fontSize: 16,
        botMessage: {
          backgroundColor: '#f7f8ff',
          textColor: '#303235',
        },
        userMessage: {
          backgroundColor: '#3B81F6',
          textColor: '#ffffff',
        },
        textInput: {
          placeholder: 'Type your message...',
          backgroundColor: '#ffffff',
          textColor: '#303235',
          sendButtonColor: '#3B81F6',
        }
      }
    }
  })
</script>
<!-- END FLOWISE EMBED CODE -->
```

### Step 3: Customize Theme (Optional)
You can customize the chatbot appearance by modifying the theme object:

```javascript
theme: {
  button: {
    backgroundColor: '#3B81F6',  // Change button color
    right: 20,                   // Distance from right edge
    bottom: 20,                  // Distance from bottom edge
    size: 'medium',              // small, medium, large
    iconColor: 'white',          // Icon color
  },
  chatWindow: {
    welcomeMessage: 'Your custom message here',
    backgroundColor: '#ffffff',
    height: 500,                 // Chat window height
    width: 400,                  // Chat window width
    fontSize: 16,
    botMessage: {
      backgroundColor: '#f7f8ff',
      textColor: '#303235',
    },
    userMessage: {
      backgroundColor: '#3B81F6',
      textColor: '#ffffff',
    },
    textInput: {
      placeholder: 'Type your message...',
      backgroundColor: '#ffffff',
      textColor: '#303235',
      sendButtonColor: '#3B81F6',
    }
  }
}
```

## METHOD 2: EMBEDDED CHAT WINDOW

If you prefer the chat window embedded in the page (not floating):

### Step 1: Update HTML
Replace the chatbot section in `index.html`:

```html
<!-- Chatbot Section -->
<section id="chat" class="py-5">
    <div class="container">
        <h2 class="text-center mb-4">Chat with Me</h2>
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div id="flowise-chatbot-container" style="width: 100%; height: 600px;"></div>
            </div>
        </div>
    </div>
</section>
```

### Step 2: Add Embed Script
```html
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
  Chatbot.initFull({
    chatflowid: 'your-chatflow-id',
    apiHost: 'https://your-flowise-url.com',
    chatflowConfig: {
      topK: 4
    },
    theme: {
      chatWindow: {
        welcomeMessage: 'Hi! Ask me anything about Rolly Alonso',
        backgroundColor: '#ffffff',
        fontSize: 16,
      }
    }
  })
</script>
```

## TESTING YOUR INTEGRATION

### Local Testing:
1. Open your portfolio in XAMPP: http://localhost/Portfolio/
2. Check if chatbot button appears (bottom-right corner)
3. Click the button to open chat window
4. Test these questions:
   - "What services does Rolly offer?"
   - "Tell me about Rolly's projects"
   - "What are Rolly's skills?"
   - "How can I contact Rolly?"

### Verify:
- ✓ Chatbot button appears
- ✓ Chat window opens when clicked
- ✓ Welcome message displays correctly
- ✓ Chatbot responds to questions
- ✓ Responses are relevant and accurate
- ✓ UI theme matches your website

## TROUBLESHOOTING

### Chatbot button not appearing:
1. Check browser console for errors (F12)
2. Verify Flowise API endpoint is correct
3. Check if chatflow is deployed and public
4. Ensure embed script is loaded (check Network tab)

### Chatbot not responding:
1. Verify chatflowid is correct
2. Check Flowise dashboard - is chatflow running?
3. Test chatflow directly in Flowise dashboard
4. Check API key is valid and has credits

### CORS errors:
1. In Flowise dashboard, add your domain to allowed origins
2. For local testing, add http://localhost to allowed origins

### Styling issues:
1. Check for CSS conflicts
2. Use browser DevTools to inspect chatbot elements
3. Adjust z-index if button is hidden behind other elements

## DEPLOYMENT CHECKLIST

Before deploying to Netlify:
- [ ] Flowise chatflow is deployed and working
- [ ] Embed code is added to index.html
- [ ] Chatflowid and apiHost are correct
- [ ] Local testing completed successfully
- [ ] Theme customization completed
- [ ] Old chatbot code removed (chatbot.js, ai_config.js)
- [ ] No console errors

After deploying to Netlify:
- [ ] Add Netlify domain to Flowise allowed origins
- [ ] Test chatbot on live site
- [ ] Verify all responses are accurate
- [ ] Check mobile responsiveness
- [ ] Monitor Flowise usage and costs

## MONITORING AND MAINTENANCE

### Monitor Chatbot Usage:
1. Check Flowise dashboard for conversation logs
2. Review API usage and costs
3. Monitor response quality
4. Update knowledge base as needed

### Update Knowledge Base:
1. Edit `knowledge-base.txt` with new information
2. Re-upload to Flowise document loader
3. Click "Upsert" to re-index
4. Test updated responses

### Improve Responses:
1. Review conversation logs in Flowise
2. Identify common questions or misunderstandings
3. Update knowledge base with more details
4. Adjust system prompt if needed
5. Fine-tune retrieval settings (Top K, chunk size)

## CUSTOMIZATION IDEAS

### Advanced Features:
- Add conversation history persistence
- Implement user authentication
- Add file upload capability
- Create multiple chatflows for different purposes
- Add analytics tracking
- Implement rate limiting
- Add feedback collection

### UI Enhancements:
- Match chatbot colors to your brand
- Add custom avatar/icon
- Customize loading animations
- Add typing indicators
- Implement message timestamps

## SUPPORT RESOURCES

- Flowise Documentation: https://docs.flowiseai.com/
- Flowise Community: https://discord.gg/jbaHfsRVBW
- Embed Widget Docs: https://docs.flowiseai.com/using-flowise/embed
- Troubleshooting Guide: https://docs.flowiseai.com/troubleshooting

## NEXT STEPS

1. Complete Flowise setup following FLOWISE_SETUP_GUIDE.md
2. Get your embed code from Flowise
3. Add embed code to index.html
4. Test locally
5. Deploy to Netlify (see DEPLOYMENT_GUIDE.md)
6. Configure custom domain
7. Monitor and optimize

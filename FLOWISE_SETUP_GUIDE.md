# FLOWISE RAG CHATBOT SETUP GUIDE

This guide will walk you through setting up a RAG (Retrieval Augmented Generation) chatbot using Flowise for your portfolio.

## WHAT IS FLOWISE?

Flowise is a low-code/no-code platform for building LLM (Large Language Model) applications. It allows you to create RAG chatbots that can retrieve information from your knowledge base and provide accurate responses.

## STEP 1: CREATE FLOWISE ACCOUNT

### Option A: Use Flowise Cloud (Recommended - Easiest)
1. Go to https://flowiseai.com/
2. Click "Try Flowise Cloud" or "Sign Up"
3. Create an account (free tier available)
4. You'll get instant access to Flowise dashboard

### Option B: Self-Host on Render.com (Free Tier Available)
1. Go to https://render.com/ and create an account
2. Click "New +" → "Web Service"
3. Connect your GitHub account
4. Create a new repository or use existing
5. Use Docker image: `flowiseai/flowise`
6. Set environment variables (explained in Step 3)

### Option C: Self-Host on Railway.app (Free Tier Available)
1. Go to https://railway.app/ and sign up
2. Click "New Project" → "Deploy Flowise"
3. Search for Flowise template
4. Click deploy and wait for deployment

## STEP 2: ACCESS FLOWISE DASHBOARD

After deployment, you should have:
- Flowise Dashboard URL (e.g., https://your-app.onrender.com or https://your-app.railway.app)
- Login credentials (if required)

## STEP 3: CREATE YOUR RAG CHATBOT IN FLOWISE

### A. Upload Knowledge Base
1. In Flowise dashboard, go to "Document Loaders"
2. Click "Add New Document Loader"
3. Select "Text File" or "Plain Text"
4. Upload your `knowledge-base.txt` file
5. Configure text splitter:
   - Chunk Size: 1000
   - Chunk Overlap: 200

### B. Setup Vector Store
1. Go to "Vector Stores"
2. Click "Add New Vector Store"
3. Choose one of these options:

   **Option 1: Pinecone (Recommended for production)**
   - Sign up at https://www.pinecone.io/ (free tier available)
   - Create an index
   - Get API key
   - Add to Flowise

   **Option 2: In-Memory Vector Store (Quick testing)**
   - No setup needed
   - Data lost on restart
   - Good for testing

   **Option 3: Supabase (Free tier available)**
   - Sign up at https://supabase.com/
   - Create new project
   - Enable Vector extension
   - Get API credentials

4. Connect your document loader to vector store
5. Click "Upsert" to index your knowledge base

### C. Configure LLM (Language Model)
1. Go to "LLMs" section
2. Choose your preferred provider:

   **Option 1: OpenAI (Most Popular)**
   - Get API key from https://platform.openai.com/api-keys
   - Model: gpt-3.5-turbo or gpt-4
   - Temperature: 0.7

   **Option 2: Google Gemini (You're already using this)**
   - Get API key from https://makersuite.google.com/app/apikey
   - Model: gemini-pro
   - Temperature: 0.7

   **Option 3: Anthropic Claude**
   - Get API key from https://console.anthropic.com/
   - Model: claude-3-sonnet or claude-3-opus

3. Enter your API key
4. Test the connection

### D. Build RAG Chain
1. Go to "Chatflows"
2. Click "Add New Chatflow"
3. Name it: "Portfolio RAG Chatbot"
4. Drag and drop these components:

   ```
   Document Loader → Text Splitter → Embeddings → Vector Store
                                                        ↓
   Chat History ← Conversational Retrieval Chain ← LLM
   ```

5. Connect the components:
   - Document Loader connects to Text Splitter
   - Text Splitter connects to Embeddings
   - Embeddings connects to Vector Store
   - Vector Store connects to Conversational Retrieval Chain
   - LLM connects to Conversational Retrieval Chain
   - Chat History connects to Conversational Retrieval Chain

6. Configure Conversational Retrieval Chain:
   - System Message: "You are Rolly Alonso's AI assistant. Answer questions about Rolly's portfolio, skills, projects, and services using the provided knowledge base. Be friendly, professional, and helpful. If you don't know the answer, politely say so."
   - Return Source Documents: Yes
   - Top K: 4

### E. Test Your Chatbot
1. Click "Save Chatflow"
2. Use the test chat interface on the right
3. Try these test questions:
   - "What services does Rolly offer?"
   - "Tell me about Rolly's projects"
   - "What are Rolly's technical skills?"
   - "How can I contact Rolly?"

## STEP 4: DEPLOY AND GET EMBED CODE

### A. Deploy Chatflow
1. Click "Deploy" or "Publish" button
2. Your chatbot will get a unique API endpoint
3. Note down the API endpoint URL

### B. Get Embed Code
1. In Flowise, go to your chatflow
2. Click "Embed" or "Share" button
3. You'll see options:
   - **Web Widget**: Copy the embed script
   - **API Endpoint**: Copy the API URL
   - **iFrame**: Copy the iframe code

4. Choose "Web Widget" and copy the code (looks like this):
```html
<script type="module">
  import Chatbot from 'https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js'
  Chatbot.init({
    chatflowid: 'your-chatflow-id',
    apiHost: 'https://your-flowise-url.com',
    theme: {
      button: {
        backgroundColor: '#3B81F6',
        right: 20,
        bottom: 20,
        size: 'medium',
        iconColor: 'white',
      },
      chatWindow: {
        welcomeMessage: 'Hi! I\'m Rolly\'s AI assistant. How can I help you?',
        backgroundColor: '#ffffff',
        height: 500,
        width: 400,
        fontSize: 16,
        poweredByTextColor: '#303235',
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
```

## STEP 5: ENVIRONMENT VARIABLES (For Self-Hosted)

If you're self-hosting on Render or Railway, set these environment variables:

```
FLOWISE_USERNAME=your-username
FLOWISE_PASSWORD=your-password
PORT=3000
DATABASE_PATH=/root/.flowise
APIKEY_PATH=/root/.flowise
SECRETKEY_PATH=/root/.flowise
LOG_PATH=/root/.flowise/logs
```

## STEP 6: CUSTOM DOMAIN (Optional)

### For Render.com:
1. Go to your service settings
2. Click "Custom Domain"
3. Add your domain/subdomain (e.g., chatbot.yourdomain.com)
4. Update DNS records as instructed

### For Railway.app:
1. Go to service settings
2. Click "Settings" → "Domains"
3. Add custom domain
4. Update DNS records

## TROUBLESHOOTING

### Chatbot not responding:
- Check API key is valid
- Verify vector store has indexed documents
- Check Flowise logs for errors

### Slow responses:
- Reduce chunk size in text splitter
- Use faster LLM model (gpt-3.5-turbo instead of gpt-4)
- Optimize vector store settings

### Inaccurate responses:
- Improve knowledge base content
- Adjust system message prompt
- Increase Top K value (retrieve more documents)

## COST CONSIDERATIONS

**Free Options:**
- Flowise: Self-host on Render/Railway free tier
- LLM: Google Gemini has generous free tier
- Vector Store: Pinecone free tier (1M vectors), Supabase free tier

**Paid Options (Better Performance):**
- Flowise Cloud: ~$20/month
- OpenAI API: Pay per token (~$0.002 per 1K tokens)
- Pinecone: ~$70/month for production
- Vector Store: Hosted options available

## NEXT STEPS

After completing Flowise setup:
1. Copy the embed code
2. Integrate it into your portfolio website (see INTEGRATION_GUIDE.md)
3. Deploy your website to Netlify
4. Test the chatbot on live site
5. Configure custom domain

## USEFUL LINKS

- Flowise Documentation: https://docs.flowiseai.com/
- Flowise GitHub: https://github.com/FlowiseAI/Flowise
- Video Tutorial: https://www.youtube.com/watch?v=s-5M9LqCFIw
- Community Discord: https://discord.gg/jbaHfsRVBW

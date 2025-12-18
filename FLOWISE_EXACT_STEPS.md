# 🎯 FLOWISE EXACT SETUP STEPS - FOOLPROOF GUIDE

This is the **EXACT, STEP-BY-STEP** guide to create your RAG chatbot in Flowise.

---

## 📊 THE CORRECT FLOWISE FLOW DIAGRAM

Your Flowise flow should look EXACTLY like this:

```
┌─────────────────────┐
│   Text File         │
│  (knowledge-base)   │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Recursive Text     │
│    Splitter         │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│  Google Generative  │
│   AI Embeddings     │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│   In-Memory         │ ← OR Pinecone (if you set it up)
│  Vector Store       │
└──────────┬──────────┘
           │
           ↓
┌─────────────────────┐
│ Conversational      │ ← Main chatbot node
│ Retrieval QA Chain  │
└──────────┬──────────┘
           ↑
           │
┌──────────┴──────────┐
│  Google Generative  │
│      AI Chat        │ ← Use your Gemini API key here
└─────────────────────┘
```

---

## 🚀 STEP-BY-STEP SETUP (DO THIS EXACTLY)

### STEP 1: Access Flowise

**Option A: Use Flowise Cloud (Easiest)**
1. Go to https://flowiseai.com/
2. Click "Try Flowise Cloud" or "Get Started"
3. Sign up with email or Google account
4. You'll be taken to the Flowise dashboard

**Option B: Self-Host on Render (Free)**
1. Go to https://render.com/
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Use Docker image: `  
5. Wait for deployment (5-10 minutes)
6. Open the URL provided (e.g., https://your-app.onrender.com)

---

### STEP 2: Create New Chatflow

1. Click **"Add New Chatflow"** (big blue button)
2. You'll see a blank canvas
3. Click on the chatflow name at top (probably "Untitled") and rename it to: **"Portfolio RAG Chatbot"**

---

### STEP 3: Add Document Loader

1. **On the left sidebar**, find **"Document Loaders"**
2. Click on **"Text File"** (or drag it to the canvas)
3. It will appear on your canvas
4. Click on the **"Text File"** node
5. In the settings panel:
   - Click **"Choose File"** or **"Upload"**
   - Select your **knowledge-base.txt** file
   - Click **"Upload"** or **"Confirm"**

✅ **Status:** Document loader added with your knowledge base

---

### STEP 4: Add Text Splitter

1. On the left sidebar, find **"Text Splitters"**
2. Click on **"Recursive Character Text Splitter"**
3. It appears on canvas
4. **Connect it:**
   - Look for a small circle/dot on the right side of "Text File" node
   - Click and drag from that circle to the "Recursive Text Splitter" node
   - You'll see a line connecting them
5. Click on the Text Splitter node to configure:
   - **Chunk Size:** 1000
   - **Chunk Overlap:** 200

✅ **Status:** Text splitter connected and configured

---

### STEP 5: Add Google Embeddings

1. On the left sidebar, find **"Embeddings"**
2. Look for **"Google Generative AI Embeddings"** or **"GoogleGenerativeAI Embeddings"**
3. Click to add it to canvas
4. **Configure it:**
   - Click on the embeddings node
   - Find **"Google API Key"** field
   - Paste your Gemini API key
   - Model: `models/embedding-001` or `embedding-001` (default is fine)
5. **Connect it:**
   - Drag from Text Splitter to Embeddings node

✅ **Status:** Embeddings configured with your Gemini key

---

### STEP 6: Add Vector Store

**Option A: In-Memory Vector Store (Quick Start - Recommended for Testing)**
1. On the left sidebar, find **"Vector Stores"**
2. Click on **"In-Memory Vector Store"**
3. Add to canvas
4. **Connect it:**
   - Drag from Embeddings to Vector Store node
   - Also connect Document (Text File) to Vector Store
   - Also connect Text Splitter to Vector Store
5. Click **"Upsert"** button on the Vector Store node
   - Wait for it to process (you'll see a loading indicator)
   - Success message should appear

**Option B: Pinecone (For Production - Requires Account)**
1. Sign up at https://www.pinecone.io/ (free tier)
2. Create an index:
   - Dimensions: 768
   - Metric: cosine
3. Get API key from Pinecone dashboard
4. In Flowise, add "Pinecone" from Vector Stores
5. Configure:
   - API Key: Your Pinecone key
   - Environment: Your Pinecone environment
   - Index Name: Your index name
6. Connect nodes and click "Upsert"

✅ **Status:** Vector store set up and documents indexed

---

### STEP 7: Add Google Gemini Chat Model

1. On the left sidebar, find **"Chat Models"**
2. Look for **"Google Generative AI"** or **"ChatGoogleGenerativeAI"**
3. Add to canvas
4. **Configure it:**
   - Click on the node
   - **Google API Key:** Paste your Gemini API key
   - **Model Name:** `gemini-1.5-flash` (recommended for speed)
     - Alternative: `gemini-1.5-pro` (better quality)
   - **Temperature:** 0.7
   - **Max Output Tokens:** 1024 (or 2048 for longer responses)

✅ **Status:** Chat model configured with Gemini

---

### STEP 8: Add Conversational Retrieval QA Chain

1. On the left sidebar, find **"Chains"**
2. Look for **"Conversational Retrieval QA Chain"**
3. Add to canvas
4. **Connect nodes to it:**
   - Drag from Vector Store to the Chain node (should connect to "Vector Store" input)
   - Drag from Chat Model (Google AI) to the Chain node (should connect to "Language Model" input)

5. **Configure the Chain:**
   - Click on the Chain node
   - Find **"System Message"** field
   - Paste this exact message:
   ```
   You are Rolly Alonso's AI assistant. Your role is to answer questions about Rolly's portfolio, skills, projects, experience, and services.

   Guidelines:
   - Be friendly, professional, and helpful
   - Answer based ONLY on the provided knowledge base
   - If you don't know something, politely say so
   - Keep responses concise but informative
   - Always mention Rolly's name when talking about his work
   - Encourage visitors to contact Rolly for opportunities

   Contact Information:
   - Email: rollyalonso88@gmail.com
   - Phone: 09998873858
   - Location: Cebu, Philippines
   ```

   - **Return Source Documents:** Toggle ON (enable this)
   - **Top K:** 4 (retrieves 4 most relevant document chunks)

✅ **Status:** Complete flow connected!

---

### STEP 9: Test Your Chatbot

1. Look for the **chat interface** on the right side of the screen
2. If you don't see it, click the **"Chat"** button or icon
3. **Test with these questions:**

   ```
   Question 1: "What services does Rolly offer?"
   Expected: Should list web development, database management, UI/UX design, etc.

   Question 2: "Tell me about Rolly's projects"
   Expected: Should mention Keepsake, Employee Management System, etc.

   Question 3: "What are Rolly's technical skills?"
   Expected: Should list HTML, CSS, JavaScript, React, Node.js, Python, PHP, MySQL, MongoDB

   Question 4: "How can I contact Rolly?"
   Expected: Should provide email (rollyalonso88@gmail.com) and phone (09998873858)

   Question 5: "Is Rolly available for hire?"
   Expected: Should say yes, open to freelance and full-time opportunities
   ```

4. **Verify responses are accurate and relevant**

✅ **Status:** Chatbot tested and working!

---

### STEP 10: Save and Deploy

1. Click **"Save Chatflow"** button (top right)
2. Wait for "Saved successfully" message
3. Your chatflow is now saved!

---

### STEP 11: Get Embed Code

1. Look for **"API Endpoint"** or **"Share"** button
2. Click it
3. You'll see options:
   - **Embed** - This is what you need!
   - API Endpoint
   - Public URL

4. Click **"Embed"** tab
5. You'll see two options:
   - **Popup (Floating)** - RECOMMENDED
   - **Full Page**

6. Select **"Popup (Floating)"**
7. Copy the entire embed code

8. **Your embed code will look like this:**
```html
<script type="module">
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
Chatbot.init({
    chatflowid: "abc123-your-actual-id-here",
    apiHost: "https://your-flowise-url.com",
    theme: {
        button: {
            backgroundColor: "#3B81F6",
            right: 20,
            bottom: 20,
            size: "medium",
        },
        chatWindow: {
            welcomeMessage: "Hi! I'm Rolly's AI assistant.",
            backgroundColor: "#ffffff",
        }
    }
})
</script>
```

✅ **Status:** Embed code obtained!

---

### STEP 12: Customize Theme (Optional but Recommended)

Replace the theme section with this for a better look:

```javascript
theme: {
    button: {
        backgroundColor: "#6366f1",  // Purple to match your portfolio
        right: 20,
        bottom: 20,
        size: "medium",
        iconColor: "white",
    },
    chatWindow: {
        welcomeMessage: "Hi! I'm Rolly's AI assistant. Ask me about his skills, projects, or how to contact him!",
        backgroundColor: "#ffffff",
        height: 600,
        width: 400,
        fontSize: 16,
        botMessage: {
            backgroundColor: "#f7f8ff",
            textColor: "#303235",
        },
        userMessage: {
            backgroundColor: "#6366f1",
            textColor: "#ffffff",
        },
        textInput: {
            placeholder: "Ask me anything about Rolly...",
            backgroundColor: "#ffffff",
            textColor: "#303235",
            sendButtonColor: "#6366f1",
        }
    }
}
```

---

### STEP 13: Add Embed Code to Your Website

1. Open your portfolio folder: `C:\xampp\htdocs\Portfolio\`
2. Open **index.html** in your code editor
3. Find this comment (around line 142):
   ```html
   <!-- FLOWISE EMBED CODE - REPLACE THIS SECTION -->
   ```
4. **DELETE** the entire comment block
5. **PASTE** your actual Flowise embed code (from Step 11)
6. Save the file

Example of what it should look like after:
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<script type="module">
import Chatbot from "https://cdn.jsdelivr.net/npm/flowise-embed/dist/web.js"
Chatbot.init({
    chatflowid: "your-actual-chatflow-id",
    apiHost: "https://your-actual-flowise-url.com",
    theme: {
        // ... your theme configuration
    }
})
</script>

</body>
</html>
```

✅ **Status:** Embed code added to website!

---

### STEP 14: Test Locally

1. Make sure XAMPP Apache is running
2. Open browser and go to: `http://localhost/Portfolio/`
3. Wait a few seconds for the page to load
4. Look for a **chatbot button** in the bottom-right corner
5. **If you see the button:**
   - ✅ Success! Click it to open the chat
   - Test with the questions from Step 9
   - Verify responses are accurate

6. **If you DON'T see the button:**
   - Press F12 to open Developer Console
   - Look for errors in the Console tab
   - Common issues:
     - Wrong chatflowid
     - Wrong apiHost URL
     - Flowise not running/accessible
     - CORS errors (need to add localhost to Flowise allowed origins)

---

## 🔧 TROUBLESHOOTING

### Issue: "Cannot connect to Flowise"
**Solution:**
1. Make sure Flowise is running
2. Check the apiHost URL is correct
3. Add your domain to Flowise CORS settings:
   - In Flowise: Settings → CORS
   - Add: `http://localhost`

### Issue: "Chatbot responds with generic answers"
**Solution:**
1. Check if documents were upserted correctly
2. Verify knowledge-base.txt was uploaded
3. Click "Upsert" again on Vector Store
4. Test directly in Flowise dashboard first

### Issue: "Embed code not working"
**Solution:**
1. Verify chatflowid is correct
2. Check apiHost URL (should be full URL with https://)
3. Make sure chatflow is saved
4. Check browser console for JavaScript errors

### Issue: "Flowise app sleeps on Render"
**Solution:**
1. This is normal on free tier
2. First request after sleep takes 30-60 seconds
3. Subsequent requests are fast
4. Upgrade to paid tier to prevent sleeping
5. Or use Flowise Cloud instead

---

## ✅ FINAL CHECKLIST

Before deploying to Netlify, verify:

- [ ] Flowise chatflow created and saved
- [ ] knowledge-base.txt uploaded and upserted
- [ ] Google Gemini API key configured in 2 places:
  - [ ] Embeddings node
  - [ ] Chat Model node
- [ ] Test questions answered correctly in Flowise dashboard
- [ ] Embed code copied
- [ ] Embed code pasted in index.html (line ~142)
- [ ] Chatbot button appears on localhost
- [ ] Chatbot responds correctly on localhost
- [ ] No console errors in browser
- [ ] Ready to push to GitHub and deploy to Netlify!

---

## 🚀 NEXT STEPS AFTER FLOWISE SETUP

Once your chatbot is working locally:

1. **Commit changes:**
   ```bash
   git add index.html
   git commit -m "Add Flowise chatbot embed code"
   git push
   ```

2. **Deploy to Netlify:**
   - Follow NETLIFY_DEPLOYMENT.md
   - Add Netlify URL to Flowise CORS settings

3. **Configure domain:**
   - Follow the domain setup guide
   - Update CORS again with final domain

4. **Monitor and improve:**
   - Check conversation logs in Flowise
   - Update knowledge base as needed
   - Improve responses based on user questions

---

## 📞 YOUR FLOWISE CREDENTIALS (FILL THIS IN)

Keep track of your setup:

```
Flowise Dashboard URL: _______________________________

Flowise Username/Email: _______________________________

Chatflow ID: _______________________________

Gemini API Key: (you already have this)

Vector Store Type: ☐ In-Memory  ☐ Pinecone

If Pinecone:
  - API Key: _______________________________
  - Environment: _______________________________
  - Index Name: _______________________________
```

---

## 🎉 YOU'RE DONE!

If you've completed all steps, your RAG chatbot is ready!

**Test it one more time:**
- Open: http://localhost/Portfolio/
- Click chatbot button
- Ask: "What services does Rolly offer?"
- Verify accurate response

**If working:** Proceed to deploy to Netlify! 🚀

**If not working:** Check troubleshooting section above or ask for help!

---

**Last Updated:** 2025-12-16
**For:** Rolly Alonso Portfolio
**AI:** Google Gemini 1.5 Flash

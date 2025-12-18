# Netlify Environment Setup Guide

This guide explains how to deploy your portfolio with the Flowise chatbot to Netlify using environment-based configuration.

## Overview

The chatbot configuration has been moved to a separate `chatbot-config.js` file that is **not committed to git** (for security). For Netlify deployment, you have two options:

---

## Option 1: Simple Deployment (Recommended for Static Sites)

Since `chatbot-config.js` is gitignored, you need to create it in Netlify.

### Steps:

#### 1. Create `netlify.toml` in your project root

This file will handle the deployment configuration:

```toml
[build]
  publish = "."
  command = "echo 'No build needed - static site'"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

#### 2. Add Build Hook to Create Config File

Create a build script that generates `chatbot-config.js`:

**Create `generate-config.sh`:**

```bash
#!/bin/bash

# Generate chatbot-config.js from environment variables
cat > chatbot-config.js << EOF
window.CHATBOT_CONFIG = {
    chatflowid: '${CHATBOT_CHATFLOW_ID}',
    apiHost: '${CHATBOT_API_HOST}',
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
    analytics: {
        enableAnalytics: true,
        enableErrorLogging: true,
        analyticsEndpoint: null,
    },
    fallback: {
        email: '${CHATBOT_FALLBACK_EMAIL}',
        phone: '${CHATBOT_FALLBACK_PHONE}'
    }
};
EOF

echo "chatbot-config.js generated successfully"
```

Make it executable:
```bash
chmod +x generate-config.sh
```

#### 3. Update `netlify.toml` to use the script

```toml
[build]
  publish = "."
  command = "bash generate-config.sh"
```

#### 4. Set Environment Variables in Netlify Dashboard

1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add the following variables:

| Variable Name | Value |
|---------------|-------|
| `CHATBOT_CHATFLOW_ID` | `82f0b30c-3695-47dd-b487-a1e03fc70986` |
| `CHATBOT_API_HOST` | `https://cloud.flowiseai.com` |
| `CHATBOT_PRIMARY_COLOR` | `#6366f1` |
| `CHATBOT_WELCOME_MESSAGE` | `Hi! I'm Rolly's AI assistant. Ask me about his skills, projects, or services!` |
| `CHATBOT_COMPANY_NAME` | `Rolly Alonso` |
| `CHATBOT_FALLBACK_EMAIL` | `rollyalonso88@gmail.com` |
| `CHATBOT_FALLBACK_PHONE` | `09998873858` |

4. Click **Save**
5. **Redeploy** your site (Deploys → Trigger deploy → Deploy site)

---

## Option 2: Commit Config to Private Repository (Simple Alternative)

If your GitHub repository is **private**, you can simply commit the `chatbot-config.js` file:

### Steps:

1. **Remove from .gitignore:**
   ```bash
   # Edit .gitignore and remove this line:
   # chatbot-config.js
   ```

2. **Commit the file:**
   ```bash
   git add chatbot-config.js
   git commit -m "Add chatbot config for Netlify deployment"
   git push origin main
   ```

3. **Ensure Repository is Private:**
   - Go to GitHub repository settings
   - Verify it's set to "Private"

4. **Deploy to Netlify:**
   - Netlify will automatically deploy with the config file

**Note:** This is only safe if your repository is private. Never commit sensitive data to public repositories.

---

## Option 3: Manual File Upload (Quick & Easy)

For quick deployment without build scripts:

### Steps:

1. **Build Locally:**
   - Ensure `chatbot-config.js` exists in your local project

2. **Deploy via Netlify Drop:**
   - Go to https://app.netlify.com/drop
   - Drag and drop your entire `Portfolio` folder
   - Netlify will deploy it as-is, including `chatbot-config.js`

3. **Update on Changes:**
   - Repeat the process whenever you make changes
   - Or connect to GitHub and use Option 1 for automatic deployments

---

## Testing Your Deployment

After deploying to Netlify:

### 1. Check Build Logs
- Go to Netlify dashboard → Deploys
- Click on the latest deploy
- Check logs for any errors

### 2. Test the Live Site
- Visit your Netlify URL (e.g., `https://your-app.netlify.app`)
- Open browser console (F12)
- Look for:
  ```
  ✅ "Flowise chatbot initialized successfully"
  ❌ "Chatbot configuration not found" (if config missing)
  ```

### 3. Test Chatbot Functionality
- Click the chatbot button in bottom-right corner
- Verify it opens and displays welcome message
- Ask a test question: "What services does Rolly offer?"
- Check for CORS errors in console

### 4. Configure CORS in Flowise
If you see CORS errors:

1. Log into https://cloud.flowiseai.com
2. Go to Settings → Security/CORS
3. Add your Netlify URL:
   ```
   https://your-app.netlify.app
   ```
4. Save and wait 1-2 minutes
5. Hard refresh your site (Ctrl+Shift+R)

---

## Troubleshooting

### Error: "Chatbot configuration not found"

**Cause:** `chatbot-config.js` is missing or not loaded

**Solutions:**
- **Option 1 users:** Check that environment variables are set in Netlify
- **Option 2 users:** Verify `chatbot-config.js` is committed to git
- **Option 3 users:** Ensure file is included in the uploaded folder

### Error: CORS policy error

**Cause:** Netlify URL not added to Flowise allowed origins

**Solution:**
1. Get your exact Netlify URL from browser
2. Add to Flowise CORS settings (including `https://`)
3. Wait 1-2 minutes for changes to propagate
4. Clear browser cache and reload

### Error: chatflowid is undefined

**Cause:** Environment variables not set correctly

**Solution:**
1. Check variable names match exactly in Netlify dashboard
2. Verify no typos in variable names
3. Redeploy after setting variables
4. Check build logs for generation script output

---

## Security Best Practices

### ✅ DO:
- Use private GitHub repositories if committing config
- Use environment variables in Netlify for sensitive data
- Rotate chatflow IDs if accidentally exposed publicly
- Monitor Flowise dashboard for unusual usage

### ❌ DON'T:
- Commit `chatbot-config.js` to public repositories
- Share your chatflow ID publicly (it's visible in browser anyway, but avoid documentation)
- Use production credentials in development
- Disable CORS protections in Flowise

---

## Local Development

For local testing with XAMPP:

1. **Ensure `chatbot-config.js` exists:**
   ```bash
   # If it doesn't exist, copy from example:
   cp chatbot-config.example.js chatbot-config.js
   ```

2. **Edit with your values:**
   ```javascript
   window.CHATBOT_CONFIG = {
       chatflowid: '82f0b30c-3695-47dd-b487-a1e03fc70986',
       apiHost: 'https://cloud.flowiseai.com',
       // ... rest of config
   };
   ```

3. **Test locally:**
   - Visit `http://localhost/Portfolio/`
   - Chatbot should load and work

4. **Before committing:**
   - Verify `.gitignore` contains `chatbot-config.js`
   - Run `git status` to ensure it's not staged
   - Commit other changes only

---

## Recommended Approach

For **most users**, we recommend **Option 1 (Environment Variables)** because:

✅ Configuration is stored securely in Netlify
✅ Easy to update without code changes
✅ Works with public GitHub repositories
✅ Follows industry best practices
✅ Separates configuration from code

---

## Quick Start Checklist

- [ ] Choose deployment option (1, 2, or 3)
- [ ] Create `netlify.toml` (if using Option 1)
- [ ] Create `generate-config.sh` (if using Option 1)
- [ ] Set environment variables in Netlify (if using Option 1)
- [ ] Commit and push to GitHub
- [ ] Deploy to Netlify
- [ ] Configure CORS in Flowise
- [ ] Test live site
- [ ] Verify chatbot works
- [ ] Monitor for errors

---

## Support

If you encounter issues:

1. Check Netlify build logs
2. Check browser console for errors
3. Verify all environment variables are set
4. Ensure CORS is configured in Flowise
5. Test locally first with `chatbot-config.js`

For Netlify-specific issues: https://docs.netlify.com/
For Flowise-specific issues: https://docs.flowiseai.com/

# 🚀 QUICK REFERENCE CARD

**Print this or keep it open while implementing!**

---

## 📋 IMPLEMENTATION STEPS

### ☑️ PHASE 1: FLOWISE (1-2 hrs)
```
1. Sign up: flowiseai.com OR render.com OR railway.app
2. Create RAG chatflow in Flowise
3. Upload: knowledge-base.txt
4. Configure: Vector Store (Pinecone free) + LLM (Gemini free)
5. Test in dashboard
6. Get embed code
```
**📖 Guide:** FLOWISE_SETUP_GUIDE.md

---

### ☑️ PHASE 2: INTEGRATE (15 min)
```
1. Open: index.html
2. Find: <!-- FLOWISE EMBED CODE -->
3. Replace with your embed code
4. Save
5. Test: http://localhost/Portfolio/
```
**📖 Guide:** INTEGRATION_GUIDE.md

---

### ☑️ PHASE 3: GITHUB (10 min)
```bash
cd C:\xampp\htdocs\Portfolio
git add .
git commit -m "Add Flowise chatbot"
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git
git push -u origin main
```

---

### ☑️ PHASE 4: NETLIFY (20 min)
```
1. Go to: netlify.com
2. "Add site" → "Import from GitHub"
3. Select your repository
4. Deploy!
5. Copy Netlify URL
6. Add URL to Flowise CORS settings
```
**📖 Guide:** NETLIFY_DEPLOYMENT.md

---

### ☑️ PHASE 5: DOMAIN (30 min)
```
In Netlify:
  Domain settings → Add custom domain → Enter domain

In Domain Registrar (DNS):
  Type: A     | Name: @         | Value: 75.2.60.5
  Type: CNAME | Name: www       | Value: your-site.netlify.app

Wait 1-24 hours for DNS propagation

Enable HTTPS:
  Netlify → HTTPS → Verify DNS → Provision certificate
```
**📖 Guide:** NETLIFY_DEPLOYMENT.md

---

### ☑️ PHASE 6: TEST (30 min)
```
✓ Website loads
✓ Chatbot button appears (bottom-right)
✓ Chatbot responds correctly
✓ Mobile works
✓ No errors in console (F12)
```

**Test Questions:**
- "What services does Rolly offer?"
- "Tell me about your projects"
- "How can I contact you?"

---

## 🔗 IMPORTANT LINKS

| Service | URL | Purpose |
|---------|-----|---------|
| **Flowise Cloud** | flowiseai.com | Easiest option |
| **Render** | render.com | Free hosting for Flowise |
| **Railway** | railway.app | Alternative free hosting |
| **Netlify** | netlify.com | Website hosting |
| **Pinecone** | pinecone.io | Vector store (free tier) |
| **Google AI** | makersuite.google.com/app/apikey | Free Gemini API |
| **OpenAI** | platform.openai.com/api-keys | GPT API (paid) |
| **Namecheap** | namecheap.com | Buy domain |

---

## 💰 FREE TIER OPTIONS

**✅ Recommended Stack:**
- Flowise: Self-host on Render (FREE)
- LLM: Google Gemini (FREE generous quota)
- Vector Store: Pinecone (FREE 1M vectors)
- Hosting: Netlify (FREE 100GB bandwidth)
- **Total: $0/month** (just $12/year for domain)

---

## 🆘 EMERGENCY TROUBLESHOOTING

### Chatbot not appearing
```
1. F12 → Console → Check errors
2. Verify embed code in index.html
3. Check chatflowid and apiHost values
4. Test Flowise chatflow in dashboard
```

### Chatbot not responding
```
1. Check Flowise dashboard - is it running?
2. Verify domain in Flowise allowed origins (CORS)
3. Check LLM API key is valid
4. Test in Flowise dashboard first
```

### Website not loading
```
1. Check Netlify deploy logs
2. Verify files pushed to GitHub
3. Clear browser cache
4. Try incognito/private window
```

### Domain not working
```
1. Wait 24-48 hours for DNS
2. Check DNS: dnschecker.org
3. Verify DNS records are correct
4. Try www subdomain
```

---

## 📞 NEED HELP?

**Documentation:**
- Full Roadmap: `IMPLEMENTATION_ROADMAP.md`
- Flowise Setup: `FLOWISE_SETUP_GUIDE.md`
- Integration: `INTEGRATION_GUIDE.md`
- Deployment: `NETLIFY_DEPLOYMENT.md`

**Community:**
- Flowise Discord: discord.gg/jbaHfsRVBW
- Netlify Forum: answers.netlify.com

---

## ✅ FINAL CHECKLIST

Before going live:
- [ ] Flowise chatbot deployed and working
- [ ] Embed code added to index.html
- [ ] Local test passed (localhost)
- [ ] Code pushed to GitHub
- [ ] Deployed to Netlify
- [ ] Netlify URL added to Flowise CORS
- [ ] Custom domain configured (optional)
- [ ] DNS propagated and working
- [ ] HTTPS enabled
- [ ] All chatbot test questions answered correctly
- [ ] Mobile responsive
- [ ] No console errors

---

## 🎯 YOUR CREDENTIALS

**Fill this in as you go:**

```
GitHub Username: ___________________
GitHub Repo URL: ___________________

Flowise Dashboard URL: ___________________
Flowise Username: ___________________
Flowise Chatflow ID: ___________________

Netlify Site Name: ___________________
Netlify URL: ___________________

Custom Domain: ___________________
Domain Registrar: ___________________

Vector Store (Pinecone/etc): ___________________
API Key Location: ___________________

LLM Provider (Gemini/OpenAI): ___________________
API Key Location: ___________________
```

---

## ⏱️ TIME TRACKER

Use this to track your progress:

```
Phase 1 - Flowise Setup:
  Started: _____  Completed: _____  Time: _____

Phase 2 - Integration:
  Started: _____  Completed: _____  Time: _____

Phase 3 - GitHub:
  Started: _____  Completed: _____  Time: _____

Phase 4 - Netlify:
  Started: _____  Completed: _____  Time: _____

Phase 5 - Domain:
  Started: _____  Completed: _____  Time: _____

Phase 6 - Testing:
  Started: _____  Completed: _____  Time: _____

TOTAL TIME: _____
```

---

## 🎉 COMPLETION

**When you're done:**
1. ✓ Portfolio is live
2. ✓ Chatbot is working
3. ✓ Domain is configured
4. ✓ All tests passed

**Share your success:**
- Add to LinkedIn
- Update resume
- Share on social media
- Update GitHub profile

---

**You got this! 🚀**

**Start here:** `IMPLEMENTATION_ROADMAP.md`

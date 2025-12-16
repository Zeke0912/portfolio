# NETLIFY DEPLOYMENT GUIDE

This guide will walk you through deploying your portfolio to Netlify with custom domain configuration.

## PREREQUISITES

Before deploying:
- [ ] Flowise chatbot is set up and deployed
- [ ] Flowise embed code is added to index.html
- [ ] Local testing completed successfully
- [ ] Git repository is ready
- [ ] All files are committed

## STEP 1: PREPARE YOUR REPOSITORY

### A. Commit All Changes
```bash
git add .
git commit -m "Prepare portfolio for deployment with Flowise chatbot"
```

### B. Create GitHub Repository (if not already done)
1. Go to https://github.com/
2. Click "New repository"
3. Name: `portfolio` or `my-portfolio`
4. Make it Public
5. Don't initialize with README (you already have files)
6. Click "Create repository"

### C. Push to GitHub
```bash
# Add GitHub as remote (replace with your username)
git remote add origin https://github.com/YOUR-USERNAME/portfolio.git

# Push code
git branch -M main
git push -u origin main
```

## STEP 2: DEPLOY TO NETLIFY

### Option A: Automatic Deployment from GitHub (Recommended)

1. **Sign Up/Login to Netlify**
   - Go to https://www.netlify.com/
   - Click "Sign up" or "Log in"
   - Choose "Continue with GitHub" (easiest)

2. **Import Project**
   - Click "Add new site" → "Import an existing project"
   - Click "GitHub"
   - Authorize Netlify to access your repositories
   - Select your portfolio repository

3. **Configure Build Settings**
   - Site name: Choose a name (e.g., `rolly-alonso-portfolio`)
   - Branch to deploy: `main`
   - Build command: Leave empty (static site)
   - Publish directory: `.` (current directory)
   - Click "Deploy site"

4. **Wait for Deployment**
   - Netlify will build and deploy your site
   - This usually takes 1-2 minutes
   - You'll get a URL like: `https://rolly-alonso-portfolio.netlify.app`

### Option B: Manual Deployment (Drag and Drop)

1. **Sign Up/Login to Netlify**
   - Go to https://www.netlify.com/
   - Sign up or log in

2. **Deploy Manually**
   - Click "Add new site" → "Deploy manually"
   - Drag and drop your entire Portfolio folder
   - Wait for upload and deployment
   - You'll get a random URL like: `https://random-name-12345.netlify.app`

## STEP 3: UPDATE FLOWISE ALLOWED ORIGINS

After deployment, you need to add your Netlify domain to Flowise:

1. Copy your Netlify URL (e.g., `https://rolly-alonso-portfolio.netlify.app`)
2. Go to your Flowise dashboard
3. Navigate to Settings → Security or CORS settings
4. Add your Netlify URL to allowed origins
5. Save changes

This prevents CORS errors when the chatbot tries to connect to Flowise.

## STEP 4: CONFIGURE CUSTOM DOMAIN

### A. Purchase or Use Existing Domain

If you don't have a domain, buy one from:
- Namecheap: https://www.namecheap.com/
- GoDaddy: https://www.godaddy.com/
- Google Domains: https://domains.google/

Free alternatives (with subdomain):
- .me domains often have free offers
- Use a subdomain from InfinityFree or similar free hosting

### B. Add Custom Domain to Netlify

1. **In Netlify Dashboard:**
   - Go to your site
   - Click "Domain settings"
   - Click "Add custom domain"
   - Enter your domain (e.g., `rollyalonso.com` or `portfolio.yourdomain.com`)
   - Click "Verify"

2. **Choose Configuration Type:**
   - **Main domain** (e.g., rollyalonso.com)
   - **Subdomain** (e.g., portfolio.yourdomain.com)

### C. Update DNS Records

Netlify will show you DNS records to add. Go to your domain registrar's DNS settings:

**For Main Domain (example.com):**
```
Type: A
Name: @ (or leave blank)
Value: 75.2.60.5

Type: CNAME
Name: www
Value: your-site.netlify.app
```

**For Subdomain (portfolio.example.com):**
```
Type: CNAME
Name: portfolio
Value: your-site.netlify.app
```

### D. Wait for DNS Propagation
- DNS changes can take 1-48 hours to propagate
- Usually happens within 1-2 hours
- Check status in Netlify Domain settings

### E. Enable HTTPS
1. In Netlify Domain settings
2. Scroll to "HTTPS" section
3. Click "Verify DNS configuration"
4. Click "Provision certificate"
5. Wait for SSL certificate (1-5 minutes)
6. Your site will now use HTTPS (secure connection)

## STEP 5: CONFIGURE ENVIRONMENT (Optional)

If you need environment variables:

1. In Netlify dashboard, go to "Site configuration" → "Environment variables"
2. Add any API keys or secrets
3. Click "Save"
4. Redeploy site for changes to take effect

**Note:** For this portfolio, environment variables are not needed since Flowise handles the API keys.

## STEP 6: TEST DEPLOYED SITE

After deployment, test everything:

### Checklist:
- [ ] Website loads correctly
- [ ] All sections visible (Home, About, Services, Works, Contact)
- [ ] Images load properly
- [ ] Links work (projects, social media)
- [ ] Responsive design works (test on mobile)
- [ ] Flowise chatbot button appears (bottom-right)
- [ ] Chatbot opens when clicked
- [ ] Chatbot responds correctly
- [ ] No console errors (F12 → Console)
- [ ] HTTPS is enabled (padlock icon in browser)

### Test Chatbot Questions:
1. "What services do you offer?"
2. "Tell me about your projects"
3. "What are your technical skills?"
4. "How can I contact you?"
5. "Are you available for hire?"

## STEP 7: CONTINUOUS DEPLOYMENT (Automatic Updates)

If using Option A (GitHub integration):

### How it works:
1. Make changes to your code locally
2. Commit changes: `git add . && git commit -m "Update portfolio"`
3. Push to GitHub: `git push`
4. Netlify automatically detects changes
5. Site rebuilds and deploys automatically (1-2 minutes)

### Benefits:
- No manual redeployment needed
- Always up-to-date
- Version history in GitHub
- Easy rollback if needed

## TROUBLESHOOTING

### Site not loading:
- Check Netlify deploy logs for errors
- Verify all files are pushed to GitHub
- Check if index.html is in root directory

### Chatbot not working:
- Verify Flowise embed code is correct
- Check if Netlify domain is in Flowise allowed origins
- Test Flowise chatflow directly in dashboard
- Check browser console for errors

### Custom domain not working:
- Verify DNS records are correct
- Wait for DNS propagation (can take 24-48 hours)
- Use https://dnschecker.org/ to check DNS status
- Clear browser cache

### HTTPS not working:
- Ensure DNS is properly configured
- Click "Verify DNS configuration" in Netlify
- Try provisioning certificate again
- Contact Netlify support if issue persists

### Images not loading:
- Check image paths in HTML (should be relative: `./images/`)
- Verify images are in repository and pushed to GitHub
- Check file names match (case-sensitive)

## COST BREAKDOWN

### Free Tier (Sufficient for Portfolio):
- Netlify Hosting: FREE
  - 100 GB bandwidth/month
  - Continuous deployment
  - HTTPS included
  - Custom domain support

- Flowise (Self-hosted): FREE on Render/Railway free tier
  - Limited hours/month
  - May sleep after inactivity

- Domain: $10-15/year
  - .com domains: ~$12/year
  - Some free subdomain options available

### Upgrade Options (If Needed):
- Netlify Pro: $19/month
  - More bandwidth
  - Analytics
  - Form handling
  - Background functions

- Flowise Cloud: $20/month
  - No sleep time
  - Better performance
  - Managed service

## MAINTENANCE

### Regular Tasks:
1. **Update Content:**
   - Add new projects
   - Update skills
   - Refresh knowledge base

2. **Monitor Performance:**
   - Check Netlify bandwidth usage
   - Review Flowise conversation logs
   - Monitor API costs

3. **Keep Updated:**
   - Update dependencies if needed
   - Refresh Flowise knowledge base
   - Improve chatbot responses based on user feedback

## USEFUL NETLIFY FEATURES

### Build Notifications:
- Get email/Slack notifications on deployments
- Settings → Build & deploy → Deploy notifications

### Deploy Previews:
- Test changes before going live
- Create branches and Netlify will create preview URLs

### Analytics:
- Enable Netlify Analytics ($9/month)
- Track visitors, pageviews, etc.

### Forms:
- Add contact forms with Netlify Forms
- Free tier: 100 submissions/month

## NEXT STEPS

After deployment:
1. Share your portfolio URL
2. Update resume with portfolio link
3. Add portfolio link to LinkedIn
4. Update GitHub profile
5. Share on social media
6. Monitor chatbot conversations
7. Gather feedback and improve

## SUPPORT RESOURCES

- Netlify Documentation: https://docs.netlify.com/
- Netlify Community: https://answers.netlify.com/
- Netlify Status: https://www.netlifystatus.com/
- Video Tutorial: https://www.youtube.com/watch?v=4h8B080Mv4U

## CHECKLIST VERIFICATION

Final verification against your original checklist:

- [x] Domain & Subdomain - Custom domain configured via Netlify
- [x] Flowise App Deployment - Deployed to cloud (Render/Railway/Flowise Cloud)
- [x] RAG Chatbot Implementation - RAG chatbot with knowledge base
- [x] Website Integration - Flowise embedded as floating widget
- [x] Testing - All features tested and verified

Congratulations! Your portfolio is now live! 🎉

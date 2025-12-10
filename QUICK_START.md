# Quick Start Checklist

## Before You Start
- [ ] Install Git: https://git-scm.com/download/win
- [ ] Create GitHub account: https://github.com/signup
- [ ] Create Netlify account: https://netlify.com

## Step-by-Step (Copy & Paste)

### 1️⃣ TEST YOUR SITE LOCALLY
```
Just open index.html in your web browser
```

### 2️⃣ SET UP GIT IN YOUR FOLDER
```powershell
cd c:\xampp\htdocs\Portfolio
git init
git config user.name "Your Name"
git config user.email "your.email@gmail.com"
```

### 3️⃣ UPLOAD TO GITHUB
```powershell
git add .
git commit -m "My portfolio website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git
git push -u origin main
```
⚠️ Replace YOUR_USERNAME with your actual GitHub username

### 4️⃣ DEPLOY TO NETLIFY
Option 1 (Easiest):
- Go to https://netlify.com
- Drag your Portfolio folder into the deploy area
- ✅ Done in 10 seconds!

Option 2 (Automatic updates):
- Connect your GitHub repo to Netlify
- Every time you push to GitHub, it auto-deploys!

---

## Common Commands

### View Git status
```powershell
git status
```

### Update your site (after making changes)
```powershell
git add .
git commit -m "Updated portfolio"
git push
```

### Check your local IP (to share with classmates)
```powershell
ipconfig
# Look for IPv4 Address under your active connection
```

---

## Troubleshooting

**Q: "git command not found"**
A: Install Git from https://git-scm.com/download/win and restart PowerShell

**Q: "fatal: not a git repository"**
A: Run `git init` first in your Portfolio folder

**Q: "Permission denied (publickey)"**
A: Set up SSH key: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

**Q: Website looks broken**
A: Check browser console (F12) for errors, or verify all files are in the same folder

---

## Need to Edit Your Portfolio?

1. Edit `index.html` with any text editor (VS Code, Notepad, etc.)
2. Save the file
3. Refresh your browser
4. To push changes: `git add . && git commit -m "message" && git push`

---

Good luck! 🚀

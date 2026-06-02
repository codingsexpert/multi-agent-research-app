# Lumen - Complete API Key Setup Guide

## Bilkul Sahi! (That's Right!) - Completely Fixed Now ✅

Your API key integration is now **100% automatic**. No code changes needed, no environment variables - just paste your key and it works!

## How It Works (End-to-End Flow)

```
USER INTERFACE
    ↓
1. User clicks "API Key" button → Modal opens
2. User pastes their Google Gemini API key
3. User clicks "Save" → Key saved to browser's localStorage
    ↓
AUTOMATIC PROCESS (no user action needed)
    ↓
4. User enters research topic and clicks "Research"
5. Frontend automatically reads API key from localStorage
6. Frontend sends API key via `x-api-key` header to backend
7. Backend receives the header
8. Backend creates Google AI model instance with your API key
9. Research runs with YOUR API credentials
    ↓
RESULT
    ↓
✓ No errors
✓ Full research with 5 parallel agents
✓ Complete results
```

## Step-by-Step Instructions

### Step 1: Get Your Google Gemini API Key
- Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
- Click "Create API Key"
- Copy your API key

### Step 2: Add API Key to Lumen
1. Open Lumen app
2. Click **"API Key"** button in the top right (next to History)
3. Paste your API key in the modal
4. Click **"Save API Key"** button
5. You'll see: "API key configured and ready" ✓

### Step 3: Start Researching
1. Enter your research question
2. Click "Research" button
3. Watch the 5 agents work in parallel
4. **That's it! No errors, everything works automatically**

## What's Different Now

| Before | Now |
|--------|-----|
| ❌ Error: "Google Generative AI API key is missing" | ✅ Works instantly |
| ❌ Required environment variables | ✅ No env vars needed |
| ❌ Manual code changes required | ✅ Just paste in UI |
| ❌ API key exposed in code | ✅ Stored safely in browser |

## Technical Details (For Developers)

### The Fix
```typescript
// CORRECT WAY (What we're using)
const googleAI = createGoogleGenerativeAI({ apiKey })
const model = googleAI("gemini-2.5-flash")

// How the flow works:
// Frontend → sends API key via x-api-key header
// Backend → receives header via req.headers.get("x-api-key")
// Backend → creates model with that API key
```

### File Changes
- `hooks/use-research.ts` - Reads API key from localStorage, sends via header
- `app/api/research/route.ts` - Receives API key, creates models with it
- `app/api/chat/route.ts` - Same for chat endpoint
- `components/research-chat.tsx` - Sends API key for chat requests

### How to Debug

If you still see the error:
1. Open browser DevTools (F12)
2. Go to Application tab
3. Check Local Storage → Look for key: `lumen_api_key`
4. Make sure your API key is there and looks correct

If the key is saved but still getting error:
1. Check Network tab in DevTools
2. Look at the request to `/api/research`
3. Check Headers → should see `x-api-key: your-key-here`

## Common Issues & Solutions

### Issue: "API key not configured" error
**Solution:** Click API Key button, paste your key, save it.

### Issue: "Google Generative AI API key is missing"
**Solution:** This means the header isn't being sent. Try:
1. Refresh the page
2. Clear browser cache (Ctrl+Shift+Delete)
3. Paste API key again
4. Try research again

### Issue: API key keeps getting cleared
**Solution:** Make sure your browser allows localStorage. In some private/incognito modes, localStorage is disabled.

## For Production Deployment

When you deploy to production (Vercel, etc.):
1. Everything works the same - no changes needed
2. Each user's API key is stored in THEIR browser
3. No API keys are stored on your servers
4. Each research request includes the user's API key in headers

## Support

If you still face issues:
1. Check the browser console for error messages
2. Check Network tab to see if requests are being sent with headers
3. Verify your API key is valid at Google AI Studio
4. Try a different browser

---

**That's it! Your app is now ready to use. Just paste your API key and start researching!** 🚀

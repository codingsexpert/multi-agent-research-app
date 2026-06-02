## Lumen - Complete Setup Guide

Your multi-agent research app is now fully configured with automatic API key management. Follow these steps:

### Step 1: Get Your Google Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click "Create API Key"
3. Select "Create API key in existing project" or create a new project
4. Copy your API key (it will look like: `AIzaSyD...`)

### Step 2: Configure API Key in Lumen

1. Open Lumen in your browser (http://localhost:3000)
2. Click the **"API Key"** button in the top right header
3. Paste your Google Gemini API key into the text field
4. Click **"Save API Key"** button
5. You'll see a green checkmark saying "API key configured and ready"

### Step 3: Start Researching!

1. Go back to the home page
2. Enter your research topic in the input box (e.g., "How is AI transforming healthcare?")
3. Choose your research depth: Quick, Standard, or Deep
4. Click the **"Research"** button
5. Watch as 5 AI agents work in parallel:
   - **Search Agent**: Finds 5+ credible sources
   - **Summarization Agent**: Extracts key points from each source
   - **Insight Agent**: Synthesizes cross-source patterns
   - **Contradiction Detector**: Finds disagreements between sources
   - **Fact-Checker**: Verifies key claims and generates follow-ups

### How It Works

- Your API key is stored **securely in your browser's localStorage**
- It's **never sent to Lumen servers** - only to Google directly
- Every research request automatically includes your API key
- You can update or remove your API key anytime via the settings modal

### Keyboard Shortcuts

- **⌘K** (Mac) or **Ctrl+K** (Windows/Linux): Start new research
- **⌘H** (Mac) or **Ctrl+H**: View research history
- **⌘;** (Mac) or **Ctrl+;**: Open API Key settings

### Troubleshooting

**Error: "Google Generative AI API key is missing"**
- Make sure you've pasted your API key in the modal and clicked "Save"
- Check that the modal shows the green checkmark
- Refresh the page and try again

**Error: "API key not configured. Please add your API key in settings."**
- Click the "API Key" button in the header
- Paste your API key and click "Save"
- Make sure it's visible in the modal

**Research is slow or not working**
- Check your internet connection
- Verify your Google API key is valid
- Make sure you haven't exceeded Google's rate limits
- Try a simpler research query

### Features

✓ Five parallel AI agents orchestrated automatically  
✓ Real-time streaming research results  
✓ Source citation and attribution  
✓ Fact-checking and contradiction detection  
✓ Customizable research depth and templates  
✓ Research history saved locally  
✓ Beautiful modern UI with dark mode  
✓ Zero server storage of your API key  

Enjoy your research! 🚀

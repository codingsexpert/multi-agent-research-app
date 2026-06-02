# API Key Setup Guide

## How to Get Your API Key

### For Google Generative AI (Gemini)

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikeys)
2. Click "Create API Key" or "Get API Key"
3. Copy your API key
4. Paste it into Lumen's API configuration

## How to Configure Your API Key in Lumen

### Option 1: Using the API Key Modal
1. Click the **"API Key"** button in the top-right header
2. Paste your Google Generative AI API key into the input field
3. Click **"Save API Key"**
4. You'll see a green confirmation badge saying "API key configured and ready"

### Option 2: Using Keyboard Shortcut
1. Press **`⌘;`** (Cmd + Semicolon) on Mac or **`Ctrl+;`** on Windows/Linux
2. The API Key modal will open
3. Paste your API key and click Save

### Option 3: Using History Button
1. Click the **"History"** button (⌘H)
2. Click the settings icon in the History panel
3. Configure your API key in the modal that appears

## Security & Privacy

- Your API key is stored **only in your browser's localStorage**
- The key is **never sent to Lumen's servers**
- The key is only used to authenticate with Google's Generative AI API
- Each API request is made directly from your browser to Google's servers
- You can remove your API key anytime by clicking "Remove API Key" in the modal

## Starting a Research

Once your API key is configured:

1. Enter your research question in the text input
2. (Optional) Choose a **Template** (General, Literature Review, Market Analysis, etc.)
3. (Optional) Select **Depth** (Quick, Standard, or Deep)
4. Click **"Research"** or press **⌘Enter**
5. Lumen will orchestrate five AI agents to research your topic

## Keyboard Shortcuts

- **⌘K** (or Ctrl+K): Start a new research
- **⌘H** (or Ctrl+H): Open history panel
- **⌘;** (or Ctrl+;): Open API key configuration

## Troubleshooting

### "API key is missing" Error
- Make sure you've pasted your API key in the API Key modal
- Check that the modal shows the green confirmation badge
- Clear your browser cache and try again

### "Request failed" Error
- Your API key might be invalid or expired
- Try generating a new API key from Google AI Studio
- Make sure you're using the correct Google Generative AI API key (not a different service)

### No Results
- Check that you have internet connectivity
- Try with a simpler or more specific research question
- Ensure you're not hitting Google's rate limits

## Getting Help

For issues with:
- **Google API Key**: Visit [Google AI Studio Documentation](https://ai.google.dev/tutorials/setup)
- **Lumen**: Check the app for error messages or try refreshing the page

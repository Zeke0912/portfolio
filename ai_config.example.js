// Copy this file to `ai_config.js` and fill in your API key to enable AI.
// WARNING: If you deploy this as a static site and put your API key here,
// the key will be visible to anyone who views your site. For production,
// set up a server-side proxy or serverless function to keep the key secret.

window.AI_CONFIG = {
  // provider: 'openai' or 'huggingface'
  provider: 'openai',
  // Paste your API key here (do NOT commit to public repos)
  apiKey: '',
  // model name to use. For OpenAI use 'gpt-3.5-turbo' or 'gpt-4o-mini' etc.
  model: 'gpt-3.5-turbo',
  // max tokens for responses
  max_tokens: 200,
  // Enable AI usage: set to true after you set apiKey
  useAI: false
};

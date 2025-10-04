# Vercel Environment Variables Setup Guide

## 🚨 Current Issue
Environment variables are not being loaded in Vercel production. The debug output shows:
- `allEnvKeys: []` (empty array)
- All `hasApi*` values are `false`
- `totalEnvKeys` shows the total number of environment variables

## 🔧 Step-by-Step Fix

### Step 1: Check Vercel Dashboard
1. Go to your Vercel project dashboard
2. Click on **Settings** tab
3. Click on **Environment Variables** in the left sidebar

### Step 2: Add Environment Variables
Add these environment variables in the Vercel dashboard:

**Required Variables:**
- `NVIDIA_API_1` = `nvapi-...` (your actual API key)
- `NVIDIA_API_2` = `nvapi-...` (your actual API key)
- `NVIDIA_API_3` = `nvapi-...` (your actual API key)
- `NVIDIA_API_4` = `nvapi-...` (your actual API key)
- `NVIDIA_API_5` = `nvapi-...` (your actual API key)
- `NVIDIA_API_6` = `nvapi-...` (your actual API key)

**Optional Variables:**
- `NVIDIA_SMALL` = `meta/llama-3.1-8b-instruct`
- `NVIDIA_MEDIUM` = `qwen/qwen3-next-80b-a3b-thinking`
- `NVIDIA_LARGE` = `openai/gpt-oss-120b`
- `NVIDIA_RERANK` = `nvidia/rerank-qa-mistral-4b`

### Step 3: Set Environment Scope
For each environment variable:
1. Set **Environment** to `Production` (or `All` if you want it in all environments)
2. Make sure the variable name is exactly as shown above
3. Make sure the value is your actual API key (starts with `nvapi-`)

### Step 4: Redeploy
After adding all environment variables:
1. Go to **Deployments** tab
2. Click **Redeploy** on the latest deployment
3. Or push a new commit to trigger a new deployment

### Step 5: Verify Fix
After redeployment, check the debug endpoint:
```
https://your-app.vercel.app/api/debug-env
```

You should see:
```json
{
  "success": true,
  "environment": {
    "hasApi1": true,
    "hasApi2": true,
    "hasApi3": true,
    "hasApi4": true,
    "hasApi5": true,
    "hasApi6": true,
    "allNvidiaKeys": ["NVIDIA_API_1", "NVIDIA_API_2", ...]
  }
}
```

## 🔍 Troubleshooting

### If environment variables still don't load:

1. **Check Vercel Function Logs:**
   - Go to Vercel dashboard → Functions tab
   - Click on any API function
   - Check logs for the debug output

2. **Verify Variable Names:**
   - Make sure there are no typos in variable names
   - Variable names are case-sensitive

3. **Check Environment Scope:**
   - Make sure variables are set for `Production` environment
   - If you set them for `Development`, they won't work in production

4. **Redeploy After Changes:**
   - Environment variable changes require a redeploy
   - Don't just save in dashboard - trigger a new deployment

## 📋 Quick Checklist

- [ ] Environment variables added to Vercel dashboard
- [ ] All 6 NVIDIA_API_* variables set
- [ ] Environment scope set to Production
- [ ] Variable names are exactly correct (case-sensitive)
- [ ] Values are actual API keys (start with nvapi-)
- [ ] Redeployed after adding variables
- [ ] Checked debug endpoint to verify

## 🆘 Still Not Working?

If the issue persists after following all steps:

1. Check the Vercel function logs for detailed error messages
2. Verify your API keys are valid by testing them locally
3. Make sure you're checking the correct Vercel project
4. Try setting just one environment variable first to test

The debug endpoint will show you exactly what environment variables are available in production.

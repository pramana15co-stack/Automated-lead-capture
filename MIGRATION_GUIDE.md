# Migration Guide: React to Next.js

## Current Structure
- Components: `client/src/components/`
- Styles: `client/src/`

## Next.js Structure Created
- API Routes: `pages/api/`
- Utilities: `lib/`
- Pages: `pages/`

## Quick Migration Steps

### Option 1: Keep Components in client/src (Recommended for existing Vercel deployment)

1. Update imports in pages to point to client/src:

```javascript
// pages/index.js
import LandingPage from '../client/src/components/LandingPage'
```

2. Update API config in components to use Next.js paths:

The API routes are now at `/api/lead`, `/api/chat`, `/api/leads` (same domain)

### Option 2: Move Components to Root (Clean Next.js structure)

1. Copy components:
```bash
cp -r client/src/components components
cp -r client/src/styles styles
```

2. Update all imports in components to use relative paths

3. Update pages to import from `../components`

## API Endpoints Changed

- `/api/leads` (POST) → `/api/lead` (POST) - Lead submission
- `/api/chatbot` → `/api/chat` - Chatbot
- `/api/leads` (GET) - Admin dashboard (unchanged)

## Environment Variables

All environment variables remain the same. Just add them to Vercel dashboard.

## Testing

1. Test locally: `npm run dev`
2. Test API: `curl http://localhost:3000/api/health`
3. Test lead submission: Submit form on homepage
4. Test chatbot: Use chatbot widget
5. Test admin: Visit `/admin`



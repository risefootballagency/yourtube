# YourTube MVP starter

An independent YouTube video discovery site with a transparent, adjustable recommendation algorithm.

## Run locally

1. Install Node.js 20 or newer.
2. Run `npm install`.
3. Enable YouTube Data API v3 in a Google Cloud project and create an API key.
4. Copy `.env.example` to `.env.local` and replace the placeholder with the API key. Restrict the key to the YouTube Data API and your server environment.
5. Run `npm run dev` and open http://localhost:3000.

## Included

- Search YouTube by topic via a server-side API proxy
- Rank search results using interest matching, freshness and novelty
- Limit repeated recommendations from the same channel
- Like, dislike and hide controls with browser-local persistence
- Manage personal interests
- Embedded YouTube playback and direct YouTube links

## Limitations

This is an initial proof of concept, not a production recommendation system. Search returns up to 40 results for one topic, and does not provide comprehensive discovery. Feedback on one video does not yet train a cross-video user model. Google OAuth, subscription import, backend accounts, server-side feedback history, collaborative or semantic recommendations and robust quota handling are future phases. No unauthorised transcript scraping or video downloading is implemented.

YouTube Data API `search.list` consumes substantial quota (typically 100 units per request). Add caching, rate limiting and quota monitoring before a public launch. Check current YouTube API Services Terms and Developer Policies before deployment.

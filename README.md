This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Overview

This project was built by Craig Velez for UAGC INT 499 Capstone for Information Technology. The StreamList application includes both personal and group project components for the EZTechMovie Progressive Web Application (PWA). Key components of the project include user movie Watch List, integration of the The Movie Database (TMDB) API, local storage for Navigation and Cart variables, PWA Service Workers and Manifest, integration of OAuth login functionality, and credit card information management.  

## Requirements 

To run this project the following packages are required.

```bash
npm install next@latest next-auth react@latest react-dom@latest
```

Additionally this project utilizes environment variables located in a root .env file. Please ensure you have the following tokens saved in the .env file.

```bash
NEXT_PUBLIC_API_BEARER_TOKEN=[TMDB BEARER TOKEN]
GOOGLE_CLIENT_ID=[GOOGLE OAUTH CLIENT ID]
GOOGLE_CLIENT_SECRET=[GOOGLE OAUTH CLIENT SECRET]
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=[Generated NEXTAUTH SECRET]
```

## Running the Project

Run the following command to initiate a production server of this Next project.

```bash
npm run build
# and
npm start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.


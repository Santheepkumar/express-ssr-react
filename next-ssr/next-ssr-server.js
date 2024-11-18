import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App, { getSSPHome, getSSPAbout } from './client-component'; // React app entry point

const app = express();

// Serve static files (e.g., JavaScript, CSS)
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// SSR route
app.get('*', async (req, res) => {
  const context = {};
  const appHtml = renderToString(
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  // Simulated server-side data fetching
  const preloadedDataHome = await getSSPHome();
  const preloadedDataAbout = await getSSPAbout();

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>React SSR Example</title>
        <script>window.__PRELOADED_DATA_ABOUT = ${JSON.stringify(
          preloadedDataAbout
        ).replace(/</g, '\\u003c')}</script>
        <script>window.__PRELOADED_DATA_HOME = ${JSON.stringify(
          preloadedDataHome
        ).replace(/</g, '\\u003c')}</script>
    </head>
    <body>
        <div id="root">${appHtml}</div>
        <script src="/client.js"></script>
    </body>
    </html>
  `;

  res.status(200).send(html);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from './client/app';
import * as fs from "node:fs";

const app = express();

// Serve the static files (like our React bundle)
app.use(express.static('client-build'));

// Handle root route
app.get("/", (req, res) => {
    const data = {message: "Hello World!", date: new Date(), page: 'Home'};

    // Render the React component to a string
    const appHtml = ReactDOMServer.renderToString(<App data={data}/>);

    // Read HTML template
    const template = fs.readFileSync("./templates/home.html", "utf8");

    // Send the HTML response
    const html = template.replace("<!-- APP -->", appHtml).replace("<!-- DATA -->", JSON.stringify({data}));
    res.send(html);
});

app.get("/about", (req, res) => {
    const data = {message: "Hello World!", date: new Date(), page: 'About us'};

    // Render the React component to a string
    const appHtml = ReactDOMServer.renderToString(<App data={data}/>);

    // Read HTML template
    const template = fs.readFileSync("./templates/about.html", "utf8");

    // Send the HTML response
    const html = template.replace("<!-- APP -->", appHtml).replace("<!-- DATA -->", JSON.stringify({data}));
    res.send(html);
});

app.get("/routing", (req, res) => {

    // Render the React component to a string
    const appHtml = ReactDOMServer.renderToString(<App/>);

    // Read HTML template
    const template = fs.readFileSync("./templates/routing.html", "utf8");

    // Send the HTML response
    const html = template.replace("<!-- APP -->", appHtml).replace("<!-- DATA -->", JSON.stringify({}));
    res.send(html);
});

// Serve the initial HTML
// app.get('*', (req, res) => {
//     const content = ReactDOMServer.renderToString(<App />);
//
//     // Send the HTML with the pre-rendered React content
//     res.send(`
//      <!DOCTYPE html>
//     <html lang="en">
//       <head>
//         <meta charset="UTF-8" />
//         <title>React SSR with Hydration</title>
//       </head>
//       <body>
//         <div id="root">${content}</div>
//         <script src="index.js"></script> <!-- The client-side React bundle -->
//       </body>
//     </html>
//   `);
// });


// Start the server
app.listen(3000, () => {
    console.log('Server is listening on http://localhost:3000');
});

const express = require("express");
const {
    createStaticHandler, createStaticRouter, StaticRouterProvider
} = require("react-router-dom/server");

const createFetchRequest = require("./shared/request");
const routes = require("./shared/routes");
const ReactDOMServer = require("react-dom/server");
const React = require("react");

const app = express();

let handler = createStaticHandler(routes);

app.get("*", async (req, res) => {
    let fetchRequest = createFetchRequest(req, res);
    let context = await handler.query(fetchRequest);

    if (
        context instanceof Response &&
        [301, 302, 303, 307, 308].includes(context.status)
    ) {
        return res.redirect(
            context.status,
            context.headers.get("Location")
        );
    }

    let router = createStaticRouter(
        handler.dataRoutes,
        context
    );
    let html = ReactDOMServer.renderToString(
        <StaticRouterProvider
            router={router}
            context={context}
        />
    );

    res.send("<!DOCTYPE html>" + html);
});

const listener = app.listen(3000, () => {
    let {port} = listener.address();
    console.log(`Listening on port ${port}`);
});

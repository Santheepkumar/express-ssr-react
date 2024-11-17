const React = require("react");
const {json, useLoaderData, useNavigate} = require("react-router-dom");

const routes = [
    {
        path: "/home",
        loader() {
            return json({message: "Welcome to React Router!"});
        },
        Component() {
            const navigate = useNavigate()
            let data = useLoaderData();
            return (
                <div>
                    <h2>Hello</h2>
                    <button onClick={() => alert("sdfsdf")}>About</button>
                </div>
            )
        },
    }, {
        path: "/about",
        loader() {
            return json({message: "Welcome to React Router!"});
        },
        Component() {
            let data = useLoaderData();
            return <h1>{data.message}</h1>;
        },
    },
];

module.exports = routes;

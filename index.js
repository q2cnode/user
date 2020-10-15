const express = require('express');
const app = express();
const { v4: uuidv4 } = require('uuid');

app.use(express.json());

let users = [{ id: 'c3978d21-8895-401b-ad2e-4973ab4cc6e7sa', user: "Bob" }];


// GET
app.get("/users", (request, response) => {
    response.send(users);
});

// GET (BY ID)
app.get("/users/:id", (request, response) => {
    const id = request.params.id;
    const user = users.find(user => user.id === id);
    if (!user) return response.status(404).send("User with the provided ID does not exist.");
    response.send(user);
});

// POST
app.post("/users", (request, response) => {
    const user = {
        id: uuidv4(),
        user: request.body.user
    };
    users.push(user);
    response.status(201).send(users);
});

//PATCH
app.patch("/users/:id", (request, response) => {
    const id = request.params.id;
    const user = users.find(user => user.id == id);
    if (!user) return response.status(404).send("User with the provided ID does not exist.");

    user.user = request.body.user;
    response.status(200).send(user);
});


//LOAD ROOT PAGE
app.get("/", (request, response) => {
    response.send(`
        <a href="/users"> GET /users - all users</a> <br>
        <a href="/users/c3978d21-8895-401b-ad2e-4973ab4cc6e7sa"> GET /users/:id - a specific user by ID </a><br>
        POST /users - to add another user <br>
        PATCH /users/:id - to update user details by ID
    `)
});

const port = process.env.PORT || 3000;
module.exports = app.listen(port, () => console.log(`Listening on port ${port}...`));
let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../index");

//Assertion Style
chai.should();

chai.use(chaiHttp);

describe('Test API requests', () => {

    /**
     * Test the GET route
     */
    describe("GET /users", () => {
        it("It should GET all users", (done) => {
            chai.request(server)
                .get("/users")
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(1);
                    done();
                });
        });
    });


    /**
     * Test the GET (by id) route
     */
    describe("GET users/:id", () => {
        it("It should GET user by ID", (done) => {
            const id = "c3978d21-8895-401b-ad2e-4973ab4cc6e7sa";
            chai.request(server)
                .get("/users/" + id)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property("id");
                    response.body.should.have.property("user");
                    response.body.should.have.property('id').eq("c3978d21-8895-401b-ad2e-4973ab4cc6e7sa");
                    done();
                });
        });

        it("It should NOT GET a task by ID", (done) => {
            const id = 'helloworld!';
            chai.request(server)
                .get("/users/" + id)
                .end((err, response) => {
                    response.should.have.status(404);
                    response.text.should.be.eq("User with the provided ID does not exist.");
                    done();
                });
        });

    });


    /**
     * Test the POST route
     */
    describe("POST /users", () => {
        it("It should POST a new user", (done) => {
            const user = {
                "user": "Joycee"
            };
            chai.request(server)
                .post("/users")
                .send(user)
                .end((err, response) => {
                    response.should.have.status(201);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(2);
                    done();
                });
        });

    });


    /**
     * Test the PATCH route
     */

    describe("PATCH /users/:id", () => {
        it("It should PATCH an existing user", (done) => {
            const id = "c3978d21-8895-401b-ad2e-4973ab4cc6e7sa";
            const user = {
                user: "Bob"
            };
            chai.request(server)
                .patch("/users/" + id)
                .send(user)
                .end((err, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('object');
                    response.body.should.have.property('id').eq('c3978d21-8895-401b-ad2e-4973ab4cc6e7sa');
                    response.body.should.have.property('user').eq("Bob");
                    done();
                });
        });

    });


});
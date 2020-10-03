import chai, { assert } from "chai";
import chaiHttp from "chai-http";

const app = require("./app");

chai.use(chaiHttp);
chai.should();
var expect = chai.expect;

var id;

describe("Tests", () => {
  describe("/GET test", () => {
    it("it should GET all the users", function (done) {
      try {
        chai
          .request(app)
          .get("/users")
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            console.log(id);
            done();
          });
      } catch (done) {}
    });
  });
});

describe("Tests", () => {
  describe("/ADD test", () => {
    it("it should add the users", function (done) {
      try {
        chai
          .request(app)
          .post("/users/add")
          .send({
            username: "test",
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            id = res.body._id;
            done();
          });
      } catch (done) {}
    });
  });
});

describe("Tests", () => {
  describe("/Update test", () => {
    it("it should update the user", function (done) {
      try {
        chai
          .request(app)
          .put("/users/update/" + id)
          .send({
            username: "tests",
          })
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      } catch (done) {}
    });
  });
});

describe("Tests", () => {
  describe("/Delete test", () => {
    it("it should delete the user", function (done) {
      try {
        chai
          .request(app)
          .delete("/users/delete/" + id)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            done();
          });
      } catch (done) {}
    });
  });
});

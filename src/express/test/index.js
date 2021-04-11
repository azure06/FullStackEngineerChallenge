const request = require("supertest");
var assert = require("chai").assert;

const employee = {
  id: "c778639d-d2bf-484d-acfa-3f4f60cffc039",
  email: "alex.something@gmail.com",
  firstName: "Alex",
  lastName: "Magno",
  birthday: "1999/01/01",
  role: "admin",
  description: "Lorem ipsum, or lipsum as it is sometimes",
  pictureURI: "https://www.google.com",
};

const performance = {
  id: "c778639d-d2bf-484d-acfa-3f4f60cffc33",
  revieweeId: "c778639d-d2bf-484d-acfa-3f4f60cffc33",
  reviewers: ["3a3ca27d-cf4c-4550-812f-f9a6942af117"],
  feedbacks: {
    "c778639d-d2bf-484d-acfa-3f4f60cffc33": {
      description: "Attendance down these sample phrases",
      value: 100,
    },
    "3a3ca27d-cf4c-4550-812f-f9a6942af117": {
      description: "It is ",
      value: 70,
    },
  },
};

const baseURL = "http://localhost:8080";

describe("Test API calls", function () {
  // Employees
  describe("GET POST DELETE /employees", function () {
    it("response with the new Employee JSON", function (done) {
      request(baseURL)
        .post(`/employees`)
        .send(employee)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          done();
        });
    });

    it("response with all Employees", function (done) {
      request(baseURL)
        .get(`/employees`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          if (res.body <= 0) throw new Error("Employee data is missing");
        })
        .end(done);
    });

    it("remove the new Employee JSON", function (done) {
      request(baseURL)
        .delete(`/employees/c778639d-d2bf-484d-acfa-3f4f60cffc039`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          assert.isAbove(response.body.length, 0, "Employee db is not Empty");
          done();
        });
    });
  });

  describe("GET POST /performance", function () {
    // Performance
    it("response with the new performance review JSON", function (done) {
      request(baseURL)
        .post(`/performance`)
        .send(performance)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .then((response) => {
          done();
        });
    });

    it("response with the previously addedd employee performance", function (done) {
      request(baseURL)
        .get(`/performance/c778639d-d2bf-484d-acfa-3f4f60cffc33`)
        .set("Accept", "application/json")
        .expect("Content-Type", /json/)
        .expect(200)
        .expect((res) => {
          if (res.body[0].revieweeId !== "c778639d-d2bf-484d-acfa-3f4f60cffc33")
            throw new Error("EmployeeId is wrong");
        })
        .end(done);
    });
  });
});

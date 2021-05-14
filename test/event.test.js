const server = require("../server");
const chai = require("chai");
const chaiHttp = require("chai-http");

chai.should();
chai.use(chaiHttp);

describe("Testing Events Controller", () => {
  //GET All Events
  describe("GET All Events", () => {
    it("Should return all events", (done) => {
      chai
        .request(server)
        .get("/Events")
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });

    it("Should not return all events", (done) => {
      chai
        .request(server)
        .get("/event")
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  //GET a Single Event
  describe("GET a Single Event", () => {
    it("Should return a single event", (done) => {
      const eventId = "6069f5601293d648bc323427";
      chai
        .request(server)
        .get(`/events/${eventId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.be.an("object");

          done();
        });
    });

    it("Should not return a event", (done) => {
      const eventId = "6069f5601293d648bc323428";
      chai
        .request(server)
        .get(`/event/${eventId}`)
        .end((err, res) => {
          res.should.have.status(404);

          done();
        });
    });
  });

  //CREATE a Event
  describe("CREATE a Event", () => {
    it("Should create a event", (done) => {
      const crowdEvent = {
        title: "PREMIER LEAGUE",
        location: "London",
        description: "Madrid would win",
        eventDate: "05-04-2021",
        crowdImage: "crowd.jpg",
        crowdCount: 580,
      };

      //  "user": "6089701fd67f9c1c54d77ff4"

      chai
        .request(server)
        .post("/events")
        .send(crowdEvent)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.an("object");

          done();
        });
    });

    it("Should not create a event", (done) => {
      const crowdEvent = {
        location: "London",
        description: "Madrid would win",
        eventDate: "05-04-2021",
      };

      chai
        .request(server)
        .post("/events")
        .send(crowdEvent)
        .end((err, res) => {
          res.should.have.status(400);
          res.should.have.be.an("object");

          done();
        });
    });
  });

  //UPDATE a Event
  describe("UPDATE Event Info", () => {
    it("Should update event info", (done) => {
      const crowdEvent = {
        location: "Madrid",
        description: "Match ended in a draw",
        eventDate: "07-04-2021",
      };
      const eventId = "6089701fd67f9c1c54d77ff4";
      chai
        .request(server)
        .patch(`/events/${eventId}`)
        .send(crowdEvent)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });

    it("Should not update event info", (done) => {
      const crowdEvent = {
        location: "Madrid",
        description: "Match ended in a draw",
        eventDate: "07-04-2021",
      };
      const eventId = "6089701fd67f9c1c54d77ff4";
      chai
        .request(server)
        .patch(`/event/${eventId}`)
        .send(crowdEvent)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });

  //DELETE a Event
  describe("DELETE a Event", () => {
    it("Should delete an event", (done) => {
      const eventId = "6089701fd67f9c1c54d77ff4";
      chai
        .request(server)
        .delete(`/events/${eventId}`)
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.be.an("object");

          done();
        });
    });

    it("Should not delete an event", (done) => {
      const eventId = "6089701fd67f9c1c54d77ff4";
      chai
        .request(server)
        .delete(`/event/${eventId}`)
        .end((err, res) => {
          res.should.have.status(404);
          res.should.have.be.an("object");

          done();
        });
    });
  });
});

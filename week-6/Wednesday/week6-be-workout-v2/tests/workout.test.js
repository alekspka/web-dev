const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const User = require("../models/userModel");
const Workout = require("../models/workoutModel");
const workouts = require("./data/workouts.js");

const workoutsInDb = async () => {
  const records = await Workout.find({});
  return records.map((w) => w.toJSON());
};

let token = null;
let userId = null;
let createdWorkouts = [];

beforeAll(async () => {
  await User.deleteMany({});
  const result = await api
    .post("/api/user/signup")
    .send({ email: "testuser@v2.com", password: "Test1234!" });
  token = result.body.token;
  userId = result.body._id || result.body.id || (result.body.user && (result.body.user._id || result.body.user.id));
});

describe("Workout API", () => {
  describe("when there are workouts in the database", () => {
    beforeEach(async () => {
      await Workout.deleteMany({});
      createdWorkouts = [];
      for (const w of workouts) {
        const payload = { ...w, user_id: userId };
        const res = await api
          .post("/api/workouts")
          .set("Authorization", "bearer " + token)
          .send(payload)
          .expect(201);
        createdWorkouts.push(res.body);
      }
    });

    describe("retrieving workouts", () => {
      it("returns all workouts for the user as JSON", async () => {
        const res = await api
          .get("/api/workouts")
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(res.body).toHaveLength(createdWorkouts.length);
      });
    });

    describe("creating workouts", () => {
      it("adds a valid workout when authenticated", async () => {
        const newWorkout = { title: "Arms", reps: 20, load: 30, user_id: userId };
        const res = await api
          .post("/api/workouts")
          .set("Authorization", "bearer " + token)
          .send(newWorkout)
          .expect(201)
          .expect("Content-Type", /application\/json/);

        expect(res.body.title).toBe(newWorkout.title);
      });
    });

    describe("deleting workouts", () => {
      it("removes the workout when requested by id and returns 200", async () => {
        const toDelete = createdWorkouts[0];
        const id = toDelete.id || toDelete._id;
        const delRes = await api
          .delete(`/api/workouts/${id}`)
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        // controller returns the deleted document
        expect(delRes.body._id || delRes.body.id).toBe(id);

        const all = await workoutsInDb();
        expect(all.find((r) => (r.id || r._id) === id)).toBeUndefined();
      });
    });

    describe("updating workouts", () => {
      it("updates fields when given a valid id and the changes are persisted", async () => {
        const toUpdate = createdWorkouts[0];
        const id = toUpdate.id || toUpdate._id;
        const changes = { title: "Updated Title", reps: 99, load: 9 };

        // use PATCH route (controller expects patch) and then fetch the updated document
        await api
          .patch(`/api/workouts/${id}`)
          .set("Authorization", "bearer " + token)
          .send(changes)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        const getRes = await api
          .get(`/api/workouts/${id}`)
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(getRes.body.title).toBe(changes.title);
        expect(getRes.body.reps).toBe(changes.reps);
        expect(getRes.body.load).toBe(changes.load);
      });
    });

    describe("reading a single workout", () => {
      it("returns the correct workout when requested by id", async () => {
        const toView = createdWorkouts[0];
        const id = toView.id || toView._id;
        const res = await api
          .get(`/api/workouts/${id}`)
          .set("Authorization", "bearer " + token)
          .expect(200)
          .expect("Content-Type", /application\/json/);

        expect(res.body._id || res.body.id).toBe(id);
        expect(res.body.title).toBe(toView.title);
        expect(res.body.reps).toBe(toView.reps);
        expect(res.body.load).toBe(toView.load);
      });
    });
  });
});

afterAll(() => {
  mongoose.connection.close();
});
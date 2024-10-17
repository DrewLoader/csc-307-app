// backend.js
import cors from "cors";
import express from "express";
import userServices from "./user-services.js";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});



app.get("/users", (req, res) => {
  const name = req.query.name;
  const job = req.query.job;
	userServices.getUsers(name, job)
	.then((users) => {
		res.status(200).json({ users_list: users});
	})
	.catch((error) => {
		res.status(500).send("error getting users");
	});
});

app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices.findUserById(id)
    .then((user) => {
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send("Error retrieving user.");
      console.error(error);
    });
});


app.post("/users", (req, res) => {
  const userToAdd = req.body;

  userServices.addUser(userToAdd)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      res.status(500).send("Error adding user.");
      console.error(error);
    });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params["id"];

  userServices.deleteUserById(id)
    .then((user) => {
      if (user) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => {
      res.status(500).send("Error deleting user.");
      console.error(error);
    });
});


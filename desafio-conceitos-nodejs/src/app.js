const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO
  return response.json(repositories);

  const { techs } = request.query;

  const results = techs
    ? repositories.filter(project => project.techs.includes(techs))
    : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs } = request.body;

  const project = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(project);

  return response.json(project);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const { likes } = repositories.find(project => project.id === id);

  const project = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[projectIndex] = project;

  return response.json(project);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: "Project not found"});
  }

  repositories.splice(projectIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const projectIndex = repositories.findIndex(project => project.id === id);

  if (projectIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const { title, url, techs, likes } = repositories.find(project => project.id === id);

  const project = {
    id,
    title,
    url,
    techs,
    likes: likes + 1,
  };

  repositories[projectIndex] = project;

  return response.json(project);
});

module.exports = app;

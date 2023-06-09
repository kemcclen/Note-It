const noteRoute = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils');

//Get route for retrieving note info
noteRoute.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

//Post route for saving note
noteRoute.post('/notes', (req, res) => {

    const { title, text } = req.body;

    if (title && text) {
      const newNote = {
        title,
        text,
        id: uuidv4(),
      };

      readAndAppend(newNote, './db/db.json');

    const response = {
      status: 'success',
      body: newNote,
    };

    res.json(response);
  } else {
    res.json('Error in posting note');
  }
});

//Delete route for removing notes
noteRoute.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    readAndRemove(id, "./db/db.json");
    res.json("Note deleted");
  });

module.exports = noteRoute;
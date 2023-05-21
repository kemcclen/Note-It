const noteRoute = require("express").Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, readAndRemove } = require('../helpers/fsUtils');

noteRoute.get('/notes', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

noteRoute.post('/notes', (req, res) => {
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (title && text) {
      // Variable for the object we will save
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

noteRoute.delete("/notes/:id", (req, res) => {
    const id = req.params.id;
    readAndRemove(id, "./db/db.json");
    res.json("Note deleted");
  });

module.exports = noteRoute;
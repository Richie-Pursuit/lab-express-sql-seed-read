
const express = require('express');
const songs = express.Router();
const { getAllSongs, getSong, createSong } = require('../queries/songs');
const {checkName, checkArtist, checkBoolean} = require("../validations/checkSongs");


songs.get('/', async (req, res) => {
  const allSongs = await getAllSongs();
  if (allSongs[0]) {
    res.status(200).json(allSongs);
  } else {
    res.status(500).json({ error: 'Not found ' });
  }
});

  // SHOW 1 song
  songs.get("/:id", async (req, res) => {
    const { id } = req.params;
    const song = await getSong(id);
    if (song) {
      res.json(song);
    } else {
      res.status(404).json({ error: "not found" });
    }
  });

    // CREATE
songs.post("/", checkName, checkArtist, checkBoolean, async (req, res) => {
    try {
      const newSong = await createSong(req.body);
      res.json(newSong);
    } catch (error) {
      res.status(400).json({ error: error });
    }
  });

module.exports = songs;
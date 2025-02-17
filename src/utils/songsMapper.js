const songsMapper = ({ id, title, year, genre, performer, duration, albumId }) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  albumId,
});

const songsListMapper = ({ id, title, performer }) => ({
  id,
  title,
  performer,
});

module.exports = { songsMapper, songsListMapper };

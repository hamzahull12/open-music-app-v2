const mapDBSongsModel = ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  album_id,
}) => ({
  id,
  title,
  year,
  performer,
  genre,
  duration,
  albumId: album_id,
});

const mapGetSongs = ({
  id,
  title,
  performer,
}) => ({
  id,
  title,
  performer,
});

const MapGetPlaylists = ({
  id,
  name,
  username,
}) => ({
  id,
  name,
  username,
});

module.exports = {
  mapDBSongsModel,
  mapGetSongs,
  MapGetPlaylists,
};

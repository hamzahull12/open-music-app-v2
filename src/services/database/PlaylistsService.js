const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotfoundError = require('../../exceptions/NotFoundError');
const AuthenticationsError = require('../../exceptions/AuthenticationError');
const { MapGetPlaylists } = require('../../utils');

class PlaylistsService {
  constructor() {
    this._pool = new Pool();
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner],
    };

    const result = await this._pool.query(query);
    if (!result.rows[0].id) {
      throw new InvariantError('Gagal Menambahkan Playlist');
    }
    return result.rows[0].id;
  }

  async getPlaylists({ owner }) {
    const query = {
      text: `SELECT playlists.id, playlists.name, users.username
      FROM playlists
      LEFT JOIN users ON playlists.owner = users.id
      WHERE owner = $1`,
      values: [owner],
    };

    const result = await this._pool.query(query);
    return result.rows.map(MapGetPlaylists);
  }

  async verifyOwnerPlaylist(id, owner) {
    const query = {
      text: 'SELECT * FROM playlists',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError('id tidak ditemukan');
    }

    const playlists = result.rows[0];
    if (playlists.owner !== owner) {
      throw new AuthenticationsError('Anda tidak berhak mengakses resource ini');
    }
  }
}

module.exports = PlaylistsService;

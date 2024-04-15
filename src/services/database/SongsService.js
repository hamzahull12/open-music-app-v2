const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const { mapGetSongs } = require('../../utils');
const NotfoundError = require('../../exceptions/NotFoundError');

class SongsService {
  constructor() {
    this._pool = new Pool();
  }

  async addSong({
    title, year, performer, genre, duration, albumId,
  }) {
    const id = `song-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [id, title, year, performer, genre, duration, albumId],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return result.rows[0].id;
  }

  async getSongs(title, performer) {
    if (title && performer) {
      const query = {
        text: 'SELECT * FROM songs WHERE LOWER (title) LIKE $1 AND LOWER (performer) LIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
      const result = await this._pool.query(query);
      return result.rows.map(mapGetSongs);
    }

    if (title || performer) {
      const query = {
        text: 'SELECT * FROM songs WHERE LOWER (title) LIKE $1 OR LOWER (performer) LIKE $2',
        values: [`%${title}%`, `%${performer}%`],
      };
      const result = await this._pool.query(query);
      return result.rows.map(mapGetSongs);
    }

    const query = 'SELECT * FROM songs';

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError('Lagu tidak ditemukan');
    }
    return result.rows.map(mapGetSongs);
  }

  async getSongById(id) {
    const query = {
      text: 'SELECT * FROM songs WHERE id = $1',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError(`Lagu dengan Id : ${id} tidak ditemukan`);
    }

    return result.rows[0];
  }
}

module.exports = SongsService;

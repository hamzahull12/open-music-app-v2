const { nanoid } = require('nanoid');
const { Pool } = require('pg');
const InvariantError = require('../../exceptions/InvariantError');
const NotfoundError = require('../../exceptions/NotFoundError');

class AlbumsService {
  constructor() {
    this._pool = new Pool();
  }

  async addAlbums(name, year) {
    const id = `album-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO albums VALUES($1, $2, $3) RETURNING id',
      values: [id, name, year],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new InvariantError('gagal menambahkan album');
    }

    return result.rows[0].id;
  }

  async getAlbumsById(id) {
    const query = {
      text: `SELECT albums.*,
      CASE WHEN COUNT(songs.id) = 0 THEN NULL 
      ELSE json_agg(json_build_object('id', songs.id, 'title', songs.title, 'performer', songs.performer)) 
      END AS songs FROM albums
      LEFT JOIN songs ON albums.id = songs.album_id 
      WHERE albums.id = $1
      GROUP BY albums.id`,
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError(`album dengan id ${id} tidak ditemukan`);
    }
    return result.rows[0];
  }

  async editAlbumById(id, { name, year }) {
    const query = {
      text: 'UPDATE albums SET name = $1, year = $2 WHERE id = $3 RETURNING id',
      values: [name, year, id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError(`album dengan id ${id} tidak ditemukan`);
    }
  }

  async deleteAlbumById(id) {
    const query = {
      text: 'DELETE FROM albums WHERE id = $1 RETURNING id',
      values: [id],
    };

    const result = await this._pool.query(query);
    if (!result.rowCount) {
      throw new NotfoundError(`album dengan id ${id} tidak ditemukan`);
    }
  }
}

module.exports = AlbumsService;

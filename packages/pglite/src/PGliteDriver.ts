import type { Configuration } from '@mikro-orm/core';
import { AbstractSqlDriver } from '@mikro-orm/knex';
import { PGliteConnection } from './PGliteConnection.js';
import { PGlitePlatform } from './PGlitePlatform.js';

export class PGliteDriver extends AbstractSqlDriver<PGliteConnection> {

  constructor(config: Configuration) {
    super(config, new PGlitePlatform(), PGliteConnection, ['kysely', '@electric-sql/pglite']);
  }

}

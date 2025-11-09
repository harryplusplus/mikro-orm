import { PGliteDialect } from 'kysely';
import { AbstractSqlConnection, Utils } from '@mikro-orm/knex';
import { PGlite, type ParserOptions, type PGliteOptions } from '@electric-sql/pglite';

export class PGliteConnection extends AbstractSqlConnection {

  private pglite: PGlite | null = null;

  override createKyselyDialect(overrides: PGliteOptions): PGliteDialect {
    if (!this.pglite) {
      const options = this.mapOptions(overrides);
      this.pglite = new PGlite(options);
    }

    return new PGliteDialect({
      pglite: this.pglite,
      onCreateConnection: this.options.onCreateConnection ?? this.config.get('onCreateConnection'),
    });
  }

  override getClientUrl(): string {
    return '';
  }

  private mapOptions(overrides: PGliteOptions): PGliteOptions {
    const ret = {} as PGliteOptions;

    ret.dataDir = this.options.dbName ?? this.config.get('dbName');

    // use `select typname, oid, typarray from pg_type order by oid` to get the list of OIDs
    const parsers: ParserOptions = {};
    [
      1082, // date
      1114, // timestamp
      1184, // timestamptz
      1186, // interval
    ].forEach(oid => {
      parsers[oid] = (str: string) => str;
    });
    ret.parsers = parsers;

    return Utils.mergeConfig(ret, overrides);
  }

}

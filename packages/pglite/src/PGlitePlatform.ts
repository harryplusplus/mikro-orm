import { BasePostgreSqlPlatform, Utils } from '@mikro-orm/knex';
import PostgresInterval, { type IPostgresInterval } from 'postgres-interval';
import parseDate from 'postgres-date';

export class PGlitePlatform extends BasePostgreSqlPlatform {

  override convertIntervalToJSValue(value: string): unknown {
    return PostgresInterval(value);
  }

  override convertIntervalToDatabaseValue(value: IPostgresInterval): unknown {
    if (Utils.isObject(value) && 'toPostgres' in value && typeof value.toPostgres === 'function') {
      return value.toPostgres();
    }

    return value;
  }

  /**
   * @inheritDoc
   */
  override parseDate(value: string | number): Date {
    // postgres-date returns `null` for a JS ISO string which has the `T` separator
    if (typeof value === 'string' && value.charAt(10) === 'T') {
      return new Date(value);
    }

    /* v8 ignore next 3 */
    if (typeof value === 'number') {
      return new Date(value);
    }

    // @ts-ignore fix wrong type resolution during build
    const parsed = parseDate(value);

    /* v8 ignore next 3 */
    if (parsed === null) {
      return value as unknown as Date;
    }

    return parsed as Date;
  }

}

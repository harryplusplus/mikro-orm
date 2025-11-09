import {
  defineConfig,
  MikroORM,
  type Options,
  type IDatabaseDriver,
  type EntityManager,
  type EntityManagerType,
} from '@mikro-orm/core';
import { PGliteDriver } from './PGliteDriver.js';
import type { SqlEntityManager } from '@mikro-orm/knex';

/**
 * @inheritDoc
 */
export class PGliteMikroORM<EM extends EntityManager = SqlEntityManager> extends MikroORM<PGliteDriver, EM> {

  private static DRIVER = PGliteDriver;

  /**
   * @inheritDoc
   */
  static override async init<D extends IDatabaseDriver = PGliteDriver, EM extends EntityManager = D[typeof EntityManagerType] & EntityManager>(options?: Options<D, EM>): Promise<MikroORM<D, EM>> {
    return super.init(options);
  }

  /**
   * @inheritDoc
   */
  static override initSync<D extends IDatabaseDriver = PGliteDriver, EM extends EntityManager = D[typeof EntityManagerType] & EntityManager>(options: Options<D, EM>): MikroORM<D, EM> {
    return super.initSync(options);
  }

}

export type PGliteOptions = Options<PGliteDriver>;

/* v8 ignore next 3 */
export function definePGliteConfig(options: PGliteOptions) {
  return defineConfig({ driver: PGliteDriver, ...options });
}

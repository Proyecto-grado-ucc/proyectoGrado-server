import { MigrationInterface, QueryRunner } from 'typeorm';

export class DesfaseEntidadesRailway1779560000000 implements MigrationInterface {
  name = 'DesfaseEntidadesRailway1779560000000';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "grupo"
      ADD COLUMN IF NOT EXISTS "codigoAcceso" VARCHAR(10)
    `);

    await queryRunner.query(`
      ALTER TABLE "horario"
      ADD COLUMN IF NOT EXISTS "archivado" BOOLEAN NOT NULL DEFAULT false
    `);

    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      ADD COLUMN IF NOT EXISTS "estudiantesCompletaron" INTEGER[] NOT NULL DEFAULT '{}'
    `);

    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      ADD COLUMN IF NOT EXISTS "comentariosAnonimos" TEXT[] NOT NULL DEFAULT '{}'
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      DROP COLUMN IF EXISTS "comentariosAnonimos"
    `);

    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      DROP COLUMN IF EXISTS "estudiantesCompletaron"
    `);

    await queryRunner.query(`
      ALTER TABLE "horario"
      DROP COLUMN IF EXISTS "archivado"
    `);

    await queryRunner.query(`
      ALTER TABLE "grupo"
      DROP COLUMN IF EXISTS "codigoAcceso"
    `);
  }
}

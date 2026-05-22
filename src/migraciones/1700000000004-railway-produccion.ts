import { MigrationInterface, QueryRunner } from 'typeorm';

export class RailwayProduccion1700000000004 implements MigrationInterface {
  name = 'RailwayProduccion1700000000004';

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "grupo"
      ADD COLUMN IF NOT EXISTS "codigo_acceso" VARCHAR(64)
    `);

    await queryRunner.query(`
      UPDATE "grupo"
      SET "codigo_acceso" = CONCAT("codigo", '-', "id")
      WHERE "codigo_acceso" IS NULL
    `);

    await queryRunner.query(`
      WITH duplicados AS (
        SELECT
          "id",
          ROW_NUMBER() OVER (PARTITION BY "codigo_acceso" ORDER BY "id") AS rn
        FROM "grupo"
      )
      UPDATE "grupo" g
      SET "codigo_acceso" = CONCAT(g."codigo_acceso", '-', g."id")
      FROM duplicados d
      WHERE g."id" = d."id" AND d.rn > 1
    `);

    await queryRunner.query(`
      ALTER TABLE "grupo"
      ALTER COLUMN "codigo_acceso" SET NOT NULL
    `);

    await queryRunner.query(`
      CREATE UNIQUE INDEX IF NOT EXISTS "UQ_grupo_codigo_acceso"
      ON "grupo" ("codigo_acceso")
    `);

    await queryRunner.query(`
      ALTER TABLE "horario"
      ADD COLUMN IF NOT EXISTS "archivado" BOOLEAN NOT NULL DEFAULT false
    `);

    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      ADD COLUMN IF NOT EXISTS "estudiantes_completaron" JSONB NOT NULL DEFAULT '[]'::jsonb
    `);

    await queryRunner.query(`
      ALTER TABLE "evaluacion"
      ADD COLUMN IF NOT EXISTS "comentarios_anonimos" JSONB NOT NULL DEFAULT '[]'::jsonb
    `);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "evaluacion" DROP COLUMN IF EXISTS "comentarios_anonimos"`,
    );
    await queryRunner.query(
      `ALTER TABLE "evaluacion" DROP COLUMN IF EXISTS "estudiantes_completaron"`,
    );
    await queryRunner.query(`ALTER TABLE "horario" DROP COLUMN IF EXISTS "archivado"`);
    await queryRunner.query(`DROP INDEX IF EXISTS "UQ_grupo_codigo_acceso"`);
    await queryRunner.query(`ALTER TABLE "grupo" DROP COLUMN IF EXISTS "codigo_acceso"`);
  }
}

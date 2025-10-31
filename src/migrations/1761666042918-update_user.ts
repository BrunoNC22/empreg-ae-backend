import { MigrationInterface, QueryRunner } from 'typeorm'

export class UpdateUser1761666042918 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      ADD COLUMN "age" integer NULL,
      ADD COLUMN "city" text NULL
    `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "user"
      DROP COLUMN "city",
      DROP COLUMN "age"
    `)
  }
}

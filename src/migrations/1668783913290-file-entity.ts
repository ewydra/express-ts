import { MigrationInterface, QueryRunner } from "typeorm";

export class fileEntity1668783913290 implements MigrationInterface {
    name = 'fileEntity1668783913290'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`CREATE TABLE "temporary_file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "userId" integer, CONSTRAINT "FK_b2d8e683f020f61115edea206b3" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION)`);
        await queryRunner.query(`INSERT INTO "temporary_file"("id", "path", "userId") SELECT "id", "path", "userId" FROM "file"`);
        await queryRunner.query(`DROP TABLE "file"`);
        await queryRunner.query(`ALTER TABLE "temporary_file" RENAME TO "file"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "file" RENAME TO "temporary_file"`);
        await queryRunner.query(`CREATE TABLE "file" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "path" varchar NOT NULL, "userId" integer)`);
        await queryRunner.query(`INSERT INTO "file"("id", "path", "userId") SELECT "id", "path", "userId" FROM "temporary_file"`);
        await queryRunner.query(`DROP TABLE "temporary_file"`);
        await queryRunner.query(`DROP TABLE "file"`);
    }

}

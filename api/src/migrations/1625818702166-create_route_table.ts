import { MigrationInterface, QueryRunner } from "typeorm";

export class createRouteTable1625818702166 implements MigrationInterface {
    name = 'createRouteTable1625818702166'

    public async up (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "routes" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "startPosition" character varying NOT NULL, "endPosition" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_76100511cdfa1d013c859f01d8b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`INSERT INTO "routes" (title, startPosition, endposition) VALUES ("First Route", "-27.5830119,-48.6088232,16", "-27.5830129,-48.6088232,15")`);
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "routes"`);
    }

}

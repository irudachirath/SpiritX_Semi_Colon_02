import { MigrationInterface, QueryRunner } from "typeorm";

export class NameOfMigration1741503231952 implements MigrationInterface {
    name = 'NameOfMigration1741503231952'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`username\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`passwordHash\` varchar(255) NOT NULL, \`role\` varchar(255) NOT NULL DEFAULT 'user', \`budget\` bigint NOT NULL DEFAULT '9000000', UNIQUE INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` (\`username\`), UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`player\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fullName\` varchar(255) NOT NULL, \`university\` varchar(255) NOT NULL, \`playerPoints\` decimal(10,2) NOT NULL DEFAULT '0.00', \`playerValue\` bigint NOT NULL DEFAULT '0', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`player_stats\` (\`id\` int NOT NULL AUTO_INCREMENT, \`matchesPlayed\` int NOT NULL DEFAULT '0', \`inningsPlayed\` int NOT NULL DEFAULT '0', \`totalRuns\` int NOT NULL DEFAULT '0', \`totalBallsFaced\` int NOT NULL DEFAULT '0', \`totalBallsBowled\` int NOT NULL DEFAULT '0', \`totalRunsConceded\` int NOT NULL DEFAULT '0', \`totalWicketsTaken\` int NOT NULL DEFAULT '0', \`playerId\` int NULL, UNIQUE INDEX \`REL_8a1fe384eabdf0ce46a2663892\` (\`playerId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team_players\` (\`id\` int NOT NULL AUTO_INCREMENT, \`teamId\` int NULL, \`playerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`team\` (\`id\` int NOT NULL AUTO_INCREMENT, \`teamName\` varchar(255) NOT NULL, \`ownerId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`player_stats\` ADD CONSTRAINT \`FK_8a1fe384eabdf0ce46a2663892c\` FOREIGN KEY (\`playerId\`) REFERENCES \`player\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_players\` ADD CONSTRAINT \`FK_effe320794b867b0a862cafd58c\` FOREIGN KEY (\`teamId\`) REFERENCES \`team\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team_players\` ADD CONSTRAINT \`FK_9d2d1b637d5c0c293a31fd67c14\` FOREIGN KEY (\`playerId\`) REFERENCES \`player\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`team\` ADD CONSTRAINT \`FK_49a22109d0b97611c07768e37f1\` FOREIGN KEY (\`ownerId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`team\` DROP FOREIGN KEY \`FK_49a22109d0b97611c07768e37f1\``);
        await queryRunner.query(`ALTER TABLE \`team_players\` DROP FOREIGN KEY \`FK_9d2d1b637d5c0c293a31fd67c14\``);
        await queryRunner.query(`ALTER TABLE \`team_players\` DROP FOREIGN KEY \`FK_effe320794b867b0a862cafd58c\``);
        await queryRunner.query(`ALTER TABLE \`player_stats\` DROP FOREIGN KEY \`FK_8a1fe384eabdf0ce46a2663892c\``);
        await queryRunner.query(`DROP TABLE \`team\``);
        await queryRunner.query(`DROP TABLE \`team_players\``);
        await queryRunner.query(`DROP INDEX \`REL_8a1fe384eabdf0ce46a2663892\` ON \`player_stats\``);
        await queryRunner.query(`DROP TABLE \`player_stats\``);
        await queryRunner.query(`DROP TABLE \`player\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_78a916df40e02a9deb1c4b75ed\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}

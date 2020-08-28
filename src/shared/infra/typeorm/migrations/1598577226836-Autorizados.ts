import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Autorizados1598577226836 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'autorizados',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'transportadora_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'autorizado_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
    await queryRunner.createForeignKey(
      'autorizados',
      new TableForeignKey({
        name: 'transpAutorizadoTranspFK',
        columnNames: ['transportadora_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transportadoras',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'autorizados',
      new TableForeignKey({
        name: 'transpAutorizadoTranspAutFK',
        columnNames: ['autorizado_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transportadoras',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('autorizados', 'transpAutorizadoTranspFK');
    await queryRunner.dropForeignKey(
      'autorizados',
      'transpAutorizadoTranspAutFK',
    );

    await queryRunner.dropTable('autorizados');
  }
}

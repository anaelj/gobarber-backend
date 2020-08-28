import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class Viagens1598577286815 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'viagens',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'cte',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'numeroviagem',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'data',
            type: 'date',
            isNullable: false,
          },
          {
            name: 'origem',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'destino',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'mercadoria',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'placa',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'cpfmotorista',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'transportadora_id',
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
      'viagens',
      new TableForeignKey({
        name: 'viagensTranspFK',
        columnNames: ['transportadora_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transportadoras',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('viagens', 'viagensTranspFK');
    await queryRunner.dropTable('viagens');
  }
}

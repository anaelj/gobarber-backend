import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export default class TransportadorasUsuarios1598577209834
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transportadoras_usuarios',
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
            name: 'user_id',
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
      'transportadoras_usuarios',
      new TableForeignKey({
        name: 'transpUserTranspFK',
        columnNames: ['transportadora_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'transportadoras',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
    await queryRunner.createForeignKey(
      'transportadoras_usuarios',
      new TableForeignKey({
        name: 'transpUserUserFK',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'transportadoras_usuarios',
      'transpUserUserFK',
    );
    await queryRunner.dropForeignKey(
      'transportadoras_usuarios',
      'transpUserTranspFK',
    );

    await queryRunner.dropTable('transportadoras_usuarios');
  }
}

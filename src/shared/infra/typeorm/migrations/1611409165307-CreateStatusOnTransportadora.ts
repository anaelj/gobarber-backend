import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class CreateStatusOnTransportadora1611409165307
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'transportadoras',
      new TableColumn({
        name: 'status',
        type: 'varchar',
        isNullable: false,
        default: "'A'",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('transportadoras', 'status');
  }
}

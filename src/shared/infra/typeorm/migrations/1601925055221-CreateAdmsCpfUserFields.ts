import {  MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey} from "typeorm";

export default class CreateAdmsCpfUserFields1601925055221 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    
        await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'admin_flex',
              type: 'varchar',
              isNullable: false,
              default: "'N'"
            }),
          );    
        await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'cpf',
              type: 'varchar',
              isNullable: true,
            }),
          );    
        await queryRunner.addColumn(
            'users',
            new TableColumn({
              name: 'admin_transportadora',
              type: 'varchar',
              isNullable: false,
              default: "'N'"
            }),
          );    
          
    }


    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'admin_flex');
        await queryRunner.dropColumn('users', 'cpf');
        await queryRunner.dropColumn('users', 'admin_transportadora');
    }

}

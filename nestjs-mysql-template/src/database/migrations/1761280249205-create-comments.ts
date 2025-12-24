/* eslint-disable canonical/no-unused-exports */
import {
  type MigrationInterface,
  type QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCommentsTable1696957687718 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'comments',
        columns: [
          {
            name: 'id',
            type: 'varchar',
            length: '36',
            isPrimary: true,
          },
          {
            name: 'post_id',
            type: 'varchar',
            length: '36',
            isNullable: false,
          },
          {
            name: 'user_id',
            type: 'varchar',
            length: '36',
            isNullable: false,
          },
          {
            name: 'comments',
            type: 'varchar',
            length: '255',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            precision: 6,
            default: 'CURRENT_TIMESTAMP(6)',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            precision: 6,
            default: 'CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)',
          },
        ],
      }),
      true,
    );

    // Add foreign key to posts table
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'FK_comments_post_id',
        columnNames: ['post_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'posts',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Add foreign key to users table
    await queryRunner.createForeignKey(
      'comments',
      new TableForeignKey({
        name: 'FK_comments_user_id',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('comments', 'FK_comments_post_id');
    await queryRunner.dropForeignKey('comments', 'FK_comments_user_id');
    await queryRunner.dropTable('comments');
  }
}

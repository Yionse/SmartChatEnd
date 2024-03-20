import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('forum')
export class Forum {
  @PrimaryColumn('int', { primary: true, name: 'id' })
  id?: string;

  @Column('varchar', { name: 'user', length: 13 })
  user: string;

  @Column('varchar', { name: 'content', length: 400 })
  content: string;

  @Column('char', { name: 'createTime', length: 13 })
  createTime: string;
}

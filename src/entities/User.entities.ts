import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryColumn('varchar', { primary: true, name: 'qq', length: 13 })
  qq: string;

  @Column('char', { name: 'code', length: 6 })
  code: string;

  @Column('char', { name: 'sendTime', length: 14 })
  sendTime: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity()
export class Userinfo {
  @PrimaryColumn('char', { primary: true, name: 'qq', length: 13 })
  qq: string;

  @Column('varchar', { name: 'userName', length: 100 })
  userName: string;

  @Column('char', { name: 'sex', length: 3 })
  sex: string;

  @Column('varchar', { name: 'userImg', length: 30 })
  userImg: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';
@Entity('userinfo')
export class UserInfo {
  @PrimaryColumn('char', { primary: true, name: 'qq', length: 13 })
  qq: string;

  @Column('varchar', { name: 'userName', length: 100 })
  userName: string;

  @Column('char', { name: 'sex', length: 3 })
  sex: string;

  @Column('varchar', { name: 'userImg', length: 100 })
  userImg: string;

  @Column('varchar', { name: 'hobbyList', length: 60 })
  hobbyList: string;
}

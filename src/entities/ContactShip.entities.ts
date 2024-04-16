import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('contact')
export class Contact {
  @PrimaryColumn('int', { name: 'from', length: 13 })
  from: string;

  @PrimaryColumn('int', { name: 'target', length: 13 })
  target: string;

  @Column('varchar', { name: 'verifyInfo', length: 100 })
  verifyInfo: string;

  // 1-正常，0-待同意，-1-已拒绝
  @Column('int', { name: 'status' })
  status: number;

  @Column('varchar', { name: 'status', length: 20 })
  fromRemark: string;

  @Column('varchar', { name: 'status', length: 20 })
  targetRemark: string;
}

import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('contactShip')
export class ContactShip {
  @PrimaryColumn('int', { name: 'id' })
  id?: number;

  @Column('int', { name: 'requestId' })
  requestId: number;

  @Column('int', { name: 'targetId' })
  targetId: number;

  // 1-正常，0-待同意，-1-已拒绝
  @Column('char', { name: 'status', length: 3 })
  status: string;
}

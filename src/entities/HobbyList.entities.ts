import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('hobbylist')
export class HobbyList {
  @PrimaryColumn('int', { primary: true, name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', length: 20 })
  name: string;
}

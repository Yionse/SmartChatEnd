import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('forumComment')
export class ForumComment {
  @PrimaryColumn('int', { primary: true, name: 'commentId' })
  id?: number;

  @Column('int', { name: 'forumId' })
  forumId: number;

  @Column('varchar', { name: 'commentContent', length: 100 })
  commentContent: string;

  @Column('int', { name: 'userId' })
  userId: number;

  @Column('char', { name: 'commentTime', length: 13 })
  commentTime: string;
}

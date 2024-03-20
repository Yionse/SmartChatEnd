import { Forum } from '@/entities/Forum.entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ForumServices {
  constructor(
    @InjectRepository(Forum)
    private readonly forumRepository: Repository<Forum>,
  ) {}
  async create(data: Forum) {
    await this.forumRepository.save(data);
  }
}

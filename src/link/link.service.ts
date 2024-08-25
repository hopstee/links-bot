import { Injectable } from '@nestjs/common'
import { Link } from './entity/link.entity'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { LinkCreateDto } from './dto/link.create.dto'

@Injectable()
export class LinkService {
    constructor(
        @InjectRepository(Link)
        private linkRepository: Repository<Link>
    ) {}

    async getUserLinks(id: number, page: number = 0, items: number = 5) {
        const [result, total] = await this.linkRepository.findAndCount({ where: { userId: id }, skip: page * items, take: items })
        return {
            data: result,
            count: total,
            currentPage: Math.floor(total / items)
        }
    }

    async createLink(dto: LinkCreateDto) {
        return this.linkRepository.save(dto)
    }

    async getLink(code: string) {
        return await this.linkRepository.findOne({ where: { linkCode: code } })
    }

    async deleteLink(code: string) {
        return await this.linkRepository.delete({ linkCode: code })
    }
}

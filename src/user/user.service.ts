import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { User } from './entity/user.entity'
import { UserCreateDto } from './dto/user.create.dto'

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>
    ) {}

    async checkUser(id: number, dto: UserCreateDto) {
        const user = await this.usersRepository.findOneBy({ telegramId: id })

        if (!user) {
            this.createUser(dto)
        }
    }

    private createUser(dto: UserCreateDto) {
        this.usersRepository.create(dto)
    }
}

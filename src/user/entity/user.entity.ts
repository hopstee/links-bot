import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('user')
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column({ unique: true })
    telegramId: number

    @Column({ nullable: true })
    username: string

    @Column({ name: 'first_name', nullable: true })
    firstName: string

    @Column({ name: 'last_name', nullable: true })
    lastName: string
}

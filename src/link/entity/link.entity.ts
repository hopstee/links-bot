import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('link')
export class Link {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    link: string

    @Column({ name: 'link_code', unique: true })
    linkCode: string

    @Column({ name: 'user_id' })
    userId: number
}

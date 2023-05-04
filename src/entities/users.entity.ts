import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
class User {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'varchar', length: 45})
    name: string

    @Column({type: 'varchar', length: 256, unique: true})
    email: string

    @Column({type: 'boolean', default: false})
    admin: boolean

    @Column({type: 'varchar', length: 120})
    password: string

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date

    @CreateDateColumn()
    deletedAt: Date | null
}

export default User
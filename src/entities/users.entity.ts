import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs'

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

    @CreateDateColumn({default: null})
    updatedAt?: Date | null

    @DeleteDateColumn({nullable: true})
    deletedAt?: Date | null | undefined

    @BeforeInsert()
    async hashPasswordCreate() {
        this.password = await bcrypt.hash(this.password, 10)
    }

    @BeforeUpdate()
    newUpdateData() {
        this.updatedAt = new Date()
    }
}

export default User
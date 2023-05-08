import { hashSync } from "bcryptjs";
import { BeforeInsert, BeforeSoftRemove, BeforeUpdate, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

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
    createdAt: Date | string

    @CreateDateColumn({ default: null})
    updatedAt?: Date | string | null | undefined

    @DeleteDateColumn({type: 'date', default: null})
    deletedAt?: Date | string | null | undefined

    @BeforeInsert()
    hashPasswordCreate() {
        this.password =  hashSync(this.password, 10)
    }

    @BeforeUpdate()
    newUpdateDate() {
        this.updatedAt = new Date()
    }

}

export default User
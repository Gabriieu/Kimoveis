import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('real_estate')
class RealState {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'boolean', default: false})
    sold: boolean

    @Column({type: 'decimal', precision: 12, scale: 2, default: 0})
    value: number

    @Column({type: 'integer'})
    size: number

    @CreateDateColumn()
    createdAt: Date

    @CreateDateColumn()
    updatedAt: Date

}

export default RealState
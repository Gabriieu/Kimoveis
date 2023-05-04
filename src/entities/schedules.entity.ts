import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'date'})
    date: Date

    @Column({type: 'time'})
    hour: string

}

export default Schedule
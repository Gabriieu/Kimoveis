import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import RealEstate from "./realEstate.entity";
import User from "./users.entity";

@Entity('schedules')
class Schedule {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column({type: 'date'})
    date: Date

    @Column({type: 'time'})
    hour: string

    @ManyToOne(() => RealEstate)
    @JoinColumn()
    RealEstate: RealEstate

    @ManyToOne(() => User)
    @JoinColumn()
    user: User
}

export default Schedule
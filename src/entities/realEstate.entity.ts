import {
  BeforeUpdate,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import Category from "./categories.entity";
import Address from "./addresses.entity";

@Entity("real_estate")
class RealEstate {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "boolean", default: false })
  sold: boolean;

  @Column({ type: "decimal", precision: 12, scale: 2, default: 0 })
  value: string | number;

  @Column({ type: "integer" })
  size: number;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToOne(() => Address)
  @JoinColumn()
  address: Address;

  @BeforeUpdate()
  updateDate() {
    this.updatedAt = new Date()
  }
}

export default RealEstate;

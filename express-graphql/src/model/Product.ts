import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column("string")
  name!: string;

  @Column("int", { default: 0 })
  qty!: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string | Date;
}

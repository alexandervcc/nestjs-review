/* import { ObjectType, Field, Int } from "type-graphql";

export class User {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field(() => String)
  @Column()
  name!: string;

  @Field(() => Int)
  @Column("int", { default: 0 })
  qty!: number;

  @Field(() => String)
  @CreateDateColumn({ type: "timestamp" })
  createdAt!: string;
}
 */
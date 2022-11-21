import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./user.entity";

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  path!: string;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;
}

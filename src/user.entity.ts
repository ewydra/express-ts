import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { File } from "./file.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: string;

  @Column()
  email!: string;

  @Column()
  password!: string;

  @OneToMany(() => File, (file) => file.id)
  files!: File[];
}

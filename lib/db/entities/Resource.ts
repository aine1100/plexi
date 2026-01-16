import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";

export enum Category {
  LANDING = "LANDING",
  SAAS = "SAAS",
  MOBILE = "MOBILE",
  AI = "AI",
}

export enum Status {
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
  DRAFT = "DRAFT",
}

@Entity("resources")
export class Resource {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  title!: string;

  @Column({ type: "text" })
  description!: string;

  @Column()
  url!: string;

  @Column()
  image!: string;

  @Column({
    type: "enum",
    enum: Category,
  })
  category!: Category;

  @Column({
    type: "enum",
    enum: Status,
    default: Status.PUBLISHED,
  })
  status!: Status;

  @Column({ default: 0 })
  views!: number;

  @Column({ default: 0 })
  clicks!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany("AnalyticsEvent", "resource")
  events!: any[];
}

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum AdminRole {
    SUPER_ADMIN = "SUPER_ADMIN",
    ADMIN = "ADMIN",
}

@Entity("admins")
export class Admin {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({
        type: "enum",
        enum: AdminRole,
        default: AdminRole.ADMIN,
    })
    role!: AdminRole;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

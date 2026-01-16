import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

export enum SubmissionStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

@Entity("submissions")
export class Submission {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column()
    submitterName!: string;

    @Column()
    submitterEmail!: string;

    @Column()
    resourceTitle!: string;

    @Column()
    resourceCategory!: string;

    @Column()
    resourceUrl!: string;

    @Column()
    resourceImage!: string;

    @Column({ type: "text" })
    resourceDescription!: string;

    @Column({
        type: "enum",
        enum: SubmissionStatus,
        default: SubmissionStatus.PENDING,
    })
    status!: SubmissionStatus;

    @CreateDateColumn()
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
}

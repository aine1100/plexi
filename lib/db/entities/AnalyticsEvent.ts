import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm";
import { Resource } from "./Resource";

export enum EventType {
    VIEW = "VIEW",
    CLICK = "CLICK",
}

@Entity("analytics_events")
export class AnalyticsEvent {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({
        type: "enum",
        enum: EventType,
    })
    type!: EventType;

    @Column({ nullable: true })
    resourceId!: string | null;

    @ManyToOne(() => Resource, (resource) => resource.events, { nullable: true })
    @JoinColumn({ name: "resourceId" })
    resource!: Resource | null;

    @Column({ type: "jsonb", nullable: true })
    metadata!: any | null;

    @CreateDateColumn()
    timestamp!: Date;
}

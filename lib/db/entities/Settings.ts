import { Entity, PrimaryColumn, Column, UpdateDateColumn } from "typeorm";

@Entity("site_settings")
export class Settings {
  @PrimaryColumn({ default: "singleton" })
  id!: string;

  @Column({ default: "Plexi" })
  siteName!: string;

  @Column({ default: "Plexi - High-Fidelity Web Templates" })
  metaTitle!: string;

  @Column({ type: "text", default: "The curated gallery for high-fidelity web templates." })
  metaDescription!: string;

  @Column({ default: "hi@plexi.com" })
  supportEmail!: string;

  @UpdateDateColumn()
  updatedAt!: Date;
}

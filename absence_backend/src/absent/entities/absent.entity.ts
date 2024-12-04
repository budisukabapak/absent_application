import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity("absent")
export class Absent {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    reason: string;

    @Column()
    date_start: Date;

    @Column()
    date_end: Date;

    @Column()
    employee_id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult, UpdateResult } from "typeorm"; 
import { Absent } from "./entities/absent.entity";


@Injectable()
export class AbsentRepository extends Repository<Absent> {
    constructor(
        private readonly dataSource: DataSource,
    ) {
        super(Absent, dataSource.createEntityManager()); 
    }

    getAllAbsent(employee_id: number): Promise<Absent[]> {
        return this.dataSource.getRepository(Absent).find({
            where: {
                employee_id: employee_id
            }
        });
    }

    getAbsentById(id: number): Promise<Absent> {
        return this.dataSource.getRepository(Absent).findOne({
            where: {
                id: id
            }
        });
    }

    async createAbsent(absent: Partial<Absent>): Promise<Absent> {
        const absentEntity = this.dataSource.getRepository(Absent).create(absent); 
        return this.dataSource.getRepository(Absent).save(absentEntity);
    }

    async updateAbsent(id: number, absent: Partial<Absent>): Promise<UpdateResult> {
        const absentEntity = this.dataSource.getRepository(Absent).update(id, absent); 
        return absentEntity;
    }

    async deleteAbsent(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(Absent).delete(id);
    }
}

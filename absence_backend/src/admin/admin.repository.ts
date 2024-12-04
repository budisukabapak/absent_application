import { Injectable } from "@nestjs/common";
import { Admin } from "./entities/admin.entity";
import { Repository, DataSource, DeleteResult, UpdateResult } from "typeorm"; 


@Injectable()
export class AdminRepository extends Repository<Admin> {
    constructor(
        private readonly dataSource: DataSource,
    ) {
        super(Admin, dataSource.createEntityManager()); 
    }

    getAllAdmin(): Promise<Admin[]> {
        return this.dataSource.getRepository(Admin).find();
    }

    getAdminById(id: number): Promise<Admin> {
        return this.dataSource.getRepository(Admin).findOne({
            where: {
                id: id
            }
        });
    }

    async updateAdmin(id: number, admin: Partial<Admin>): Promise<UpdateResult> {
        const adminEntity = this.dataSource.getRepository(Admin).update(id, admin); 
        return adminEntity;
    }

    async deleteAdmin(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(Admin).delete(id);
    }
}

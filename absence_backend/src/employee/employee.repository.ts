import { Injectable } from "@nestjs/common";
import { Repository, DataSource, DeleteResult, UpdateResult } from "typeorm"; 
import { Employee } from "./entities/employe.entity";


@Injectable()
export class EmployeeRepository extends Repository<Employee> {
    constructor(
        private readonly dataSource: DataSource,
    ) {
        super(Employee, dataSource.createEntityManager()); 
    }

    getAllEmployee(): Promise<Employee[]> {
        return this.dataSource.getRepository(Employee).find();
    }

    getEmployeeById(id: number): Promise<Employee> {
        return this.dataSource.getRepository(Employee).findOne({
            where: {
                id: id
            }
        });
    }

    async createEmployee(employee: Partial<Employee>): Promise<Employee> {
        const employeeEntity = this.dataSource.getRepository(Employee).create(employee); 
        return this.dataSource.getRepository(Employee).save(employeeEntity);
    }

    async updateEmployee(id: number, employee: Partial<Employee>): Promise<UpdateResult> {
        const employeeEntity = this.dataSource.getRepository(Employee).update(id, employee); 
        return employeeEntity;
    }

    async deleteEmployee(id: number): Promise<DeleteResult> {
        return this.dataSource.getRepository(Employee).delete(id);
    }
}

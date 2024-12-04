import { Injectable } from '@nestjs/common';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './entities/employe.entity';
import { RegisterDto } from './dto/create.dto';

@Injectable()
export class EmployeeService {
    constructor(
        private readonly employeeRepository: EmployeeRepository
    ) {}

    findAll() {
        return this.employeeRepository.getAllEmployee();
    }

    findById(id: number) {
        return this.employeeRepository.getEmployeeById(id);
    }

    async create(employee: Partial<RegisterDto>) {
        const { first_name, last_name, email, phone_number, address, gender } = employee;
        try {
            // Create and save the admin
            await this.employeeRepository.createEmployee({
                first_name,
                last_name,
                email,
                phone_number,
                address,
                gender,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id: number, employee: Partial<Employee>) {
        const { first_name, last_name, email, phone_number, address, gender } = employee;

        try {
            // Update and save the admin
            await this.employeeRepository.updateEmployee(id, {
                first_name,
                last_name,
                email,
                phone_number,
                address,
                gender,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    delete(id: number) {
        return this.employeeRepository.deleteEmployee(id);
    }
}

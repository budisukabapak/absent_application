import { Injectable } from '@nestjs/common';
import { AbsentRepository } from './absent.repository';
import { Absent } from './entities/absent.entity';
import { RegisterDto } from './dto/create.dto';

@Injectable()
export class AbsentService {
    constructor(
        private readonly absentRepository: AbsentRepository
    ) {}

    findAll(employee_id: number) {
        return this.absentRepository.getAllAbsent(employee_id);
    }

    findById(id: number) {
        return this.absentRepository.getAbsentById(id);
    }

    async create(absent: Partial<RegisterDto>) {
        const { reason, date_start, date_end, employee_id } = absent;

        try {
            // Create and save the admin
            await this.absentRepository.createAbsent({
                reason,
                date_start: new Date(date_start),
                date_end: new Date(date_end),
                employee_id,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async update(id: number, absent: Partial<Absent>) {
        const { reason, date_start, date_end } = absent;

        try {
            // Update and save the admin
            await this.absentRepository.updateAbsent(id, {
                reason,
                date_start,
                date_end,
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    delete(id: number) {
        return this.absentRepository.deleteAbsent(id);
    }
}

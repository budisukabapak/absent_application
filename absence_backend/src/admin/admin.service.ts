import { Injectable } from '@nestjs/common';
import { AdminRepository } from './admin.repository';
import * as bcrypt from 'bcrypt';
import { UpdateDto } from './dto/update.dto';

@Injectable()
export class AdminService {
  constructor(
    private readonly adminRepository: AdminRepository
  ) {}

  findAll() {
    return this.adminRepository.getAllAdmin();
  }

  findById(id: number) {
    return this.adminRepository.getAdminById(id);
  }

  async update(id: number, admin: Partial<UpdateDto>) {
    const { first_name, last_name, email, birth_date, gender, password } = admin;

    try {
      const hashed_password = await bcrypt.hash(password, 10)

      // Update and save the admin
      await this.adminRepository.updateAdmin(id, {
        first_name,
        last_name,
        email,
        birth_date,
        gender,
        hashed_password,
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  delete(id: number) {
    return this.adminRepository.deleteAdmin(id);
  }
}

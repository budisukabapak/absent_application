import { Injectable } from "@nestjs/common";
import { Admin } from "./entities/auth.entity";
import { Repository, DataSource } from "typeorm"; 
import { sign, verify } from "jsonwebtoken";
import { LoginDto } from "./dto/login.dto";
import { TokenSet } from "./dto/token.dto";
import { config } from "src/config/secrets";


@Injectable()
export class AuthRepository extends Repository<Admin> {
    constructor(
        private readonly dataSource: DataSource,
    ) {
        super(Admin, dataSource.createEntityManager()); 
    }

    async createAdmin(admin: Partial<Admin>): Promise<Admin> {
        const adminEntity = this.dataSource.getRepository(Admin).create(admin); 
        return this.dataSource.getRepository(Admin).save(adminEntity); 
    }

    async findByEmail(email: string): Promise<Admin | undefined> {
        return this.dataSource.getRepository(Admin).findOne({
            where: {
                email: email
            }
        });
    }

    async createToken(data: LoginDto): Promise<TokenSet> {
        const accessToken = sign(
            { email: data.email }, config.secret, {
                expiresIn: "2h"
            }
        )

        return {
            accessToken: accessToken,
            tokenType: "Bearer",
            expiresIn: 7200
        }
    }

    async validateAccessToken(token: string): Promise<boolean> {
        try { 
            verify(token, config.secret);
            return true;
        } catch (err) {
            return false;
        }
    }
}

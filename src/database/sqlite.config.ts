import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Link } from "../link/entity/link.entity";
import { User } from "../user/entity/user.entity";

export const sqliteConfig: TypeOrmModuleOptions = {
    type: 'sqlite',
    database: 'database.sqlite',
    entities: [User, Link],
    synchronize: true,
}
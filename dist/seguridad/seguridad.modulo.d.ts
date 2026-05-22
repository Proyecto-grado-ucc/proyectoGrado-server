import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Rol } from './entidades/rol.entidad';
export declare class SeguridadModulo implements OnModuleInit {
    private readonly rolRepo;
    private readonly logger;
    constructor(rolRepo: Repository<Rol>);
    onModuleInit(): Promise<void>;
    private sembrarRoles;
}

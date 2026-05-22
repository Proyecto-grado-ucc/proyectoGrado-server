import { OnModuleInit } from '@nestjs/common';
import { Repository } from 'typeorm';
import { NivelIdioma } from './entidades/nivel-idioma.entidad';
export declare class ModuloHorariosModulo implements OnModuleInit {
    private readonly nivelRepo;
    constructor(nivelRepo: Repository<NivelIdioma>);
    onModuleInit(): Promise<void>;
    private sembrarNiveles;
}

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlgoritmoGenetico = void 0;
const fitness_1 = require("./fitness");
function elem(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
function crearGenesAleatorios(entrada) {
    const genes = [];
    for (const grupo of entrada.grupos) {
        for (let s = 0; s < grupo.sesiones; s++) {
            genes.push({
                grupoId: grupo.id,
                docenteId: elem(entrada.docentes).id,
                aulaId: elem(entrada.aulas).id,
                franjaId: elem(entrada.franjas).id,
            });
        }
    }
    return genes;
}
class AlgoritmoGenetico {
    constructor(entrada, config) {
        this.entrada = entrada;
        this.config = config;
        this.poblacion = [];
    }
    inicializar() {
        this.poblacion = Array.from({ length: this.config.tamPoblacion }, () => {
            const genes = crearGenesAleatorios(this.entrada);
            return { genes, fitness: (0, fitness_1.calcularFitness)(genes, this.entrada) };
        });
    }
    seleccionTorneo(k = 3) {
        const candidatos = Array.from({ length: k }, () => this.poblacion[Math.floor(Math.random() * this.poblacion.length)]);
        return candidatos.reduce((mejor, c) => (c.fitness > mejor.fitness ? c : mejor));
    }
    cruzar(p1, p2) {
        const punto = Math.floor(Math.random() * p1.genes.length);
        const genes = [...p1.genes.slice(0, punto), ...p2.genes.slice(punto)];
        return { genes, fitness: (0, fitness_1.calcularFitness)(genes, this.entrada) };
    }
    mutar(c) {
        if (Math.random() > this.config.tasaMutacion)
            return c;
        const genes = c.genes.map((g) => ({ ...g }));
        const idx = Math.floor(Math.random() * genes.length);
        const tipo = Math.floor(Math.random() * 3);
        if (tipo === 0)
            genes[idx].docenteId = elem(this.entrada.docentes).id;
        else if (tipo === 1)
            genes[idx].aulaId = elem(this.entrada.aulas).id;
        else
            genes[idx].franjaId = elem(this.entrada.franjas).id;
        return { genes, fitness: (0, fitness_1.calcularFitness)(genes, this.entrada) };
    }
    evolucionar() {
        this.inicializar();
        let mejor = this.poblacion.reduce((m, c) => (c.fitness > m.fitness ? c : m));
        for (let gen = 0; gen < this.config.generaciones; gen++) {
            const nueva = [mejor];
            while (nueva.length < this.config.tamPoblacion) {
                const p1 = this.seleccionTorneo();
                const p2 = this.seleccionTorneo();
                const hijo = Math.random() < this.config.tasaCruce ? this.cruzar(p1, p2) : p1;
                nueva.push(this.mutar(hijo));
            }
            this.poblacion = nueva;
            const candidato = this.poblacion.reduce((m, c) => (c.fitness > m.fitness ? c : m));
            if (candidato.fitness > mejor.fitness)
                mejor = candidato;
        }
        return { mejor, generaciones: this.config.generaciones };
    }
}
exports.AlgoritmoGenetico = AlgoritmoGenetico;
//# sourceMappingURL=algoritmo-genetico.js.map
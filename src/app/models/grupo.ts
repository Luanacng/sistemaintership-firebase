import { Estagio } from './estagio';
import { Aluno } from "./aluno";

export interface Grupo {
    id?: string, //opcional
    nome: string,
    instituicao: string,
    setor: string,
    alunos: any,
    estagio: Estagio[]
}
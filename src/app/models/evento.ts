export interface Evento {
    id: number;
    titulo: string;
    data: string;            // o <input type="date"> devolve 'aaaa-mm-dd'
    local: string;
    emailResponsavel: string;
    vagas: number | null;    // o <input type="number"> vazio vale null
}
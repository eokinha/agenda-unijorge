export type FormaPagamento = 'pix' | 'cartao' | 'boleto' | 'dinheiro' | '';

export interface Participante {
    id: number;
    eventoId: number;        // evento ao qual o participante pertence
    descricao: string;
    email: string;
    telefone: string;
    formaPagamento: FormaPagamento;
}

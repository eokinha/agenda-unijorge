# Entrega — Participantes (03/11) e Pipes

Aluno: Lucas Duarte
Projeto: agenda-unijorge

## Arquivos

| Arquivo | O que é |
|---|---|
| `prints/01-json-dado-cru.png` | Lista de eventos com os pipes e o `{{ eventos \| json }}` mostrando a data crua `2026-12-04` dentro do objeto (a linha já foi apagada depois) |
| `prints/02-tela-participantes.png` | Tela de participantes de um evento usando `iniciais`, `telefone`, `formaPagamento` e `diasPara` |
| `prints/03-ng-test.png` | `ng test` com tudo verde (14 arquivos, 39 testes) |
| `respostas.md` | Respostas das questões 1 a 6 e do desafio 3 |

## Checklist — Pipes

- [x] `registerLocaleData` e `LOCALE_ID: 'pt-BR'` no `app.config.ts`
- [x] Lista de eventos com `date`, `uppercase` e `number`
- [x] Print do `| json` com o dado cru (e a linha apagada depois)
- [x] Os quatro pipes em `src/app/pipes/`, gerados pelo CLI, sem `unknown` ou `any`
- [x] `formaPagamento` com `Record<FormaPagamento, string>`
- [x] `diasPara` sem `new Date(texto)` e com o `hoje` como parâmetro
- [x] Tela de participantes usando os quatro pipes
- [x] Todas as linhas das tabelas dos itens 4 a 7 como testes; print do `ng test` verde
- [x] `ng build` sem erro
- [x] Respostas das questões 1 a 6
- [x] Commit e push
- [x] Desafio: pipes `titulo`, `resumo` e `mascaraEmail` (com testes)

## Tarefa 03/11 — Participantes

- Entidade `Participante` em `src/app/models/participante.ts` (descrição, e-mail, telefone e forma de pagamento)
- Relacionamento 1:N: cada participante guarda o `eventoId` do evento
- Cadastro, consulta, edição e exclusão de participantes dentro da tela de cada evento (`/eventos/:id/participantes`)
- Ao excluir um evento, os participantes dele também são excluídos
- Como não foi passada uma API, os dados ficam salvos no `localStorage` pelo `EventoService` (`src/app/services/evento-service.ts`)

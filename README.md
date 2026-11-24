# Agenda Unijorge

Agenda de eventos acadêmicos feita em Angular para a disciplina de Desenvolvimento Dinâmico.
Permite cadastrar eventos e gerenciar os participantes de cada evento.

## Requisitos

- Node.js **24.15 ou mais novo** (ou 26.x) — versões mais antigas são recusadas pelo Angular CLI
- Angular CLI 22: `npm install -g @angular/cli@22`

Confira com:

```bash
node -v
ng version
```

## Como rodar

```bash
npm install
ng serve
```

Depois abra `http://localhost:4200/`.

> Se o PowerShell disser que `ng` não é reconhecido, instale o CLI global (comando acima) ou use `npm start`.

## Testes e build

```bash
ng test     # testes com Vitest
ng build    # gera a pasta dist/
```

## Telas

| Rota | Tela |
|---|---|
| `/` | Início |
| `/eventos` | Lista de eventos |
| `/eventos/novo` | Cadastro de evento |
| `/eventos/:id/participantes` | Participantes do evento (cadastrar, editar e excluir) |

## Estrutura

```
src/app/
  models/      Evento, Participante e as validações
  services/    EventoService (salva eventos e participantes no localStorage)
  pipes/       telefone, formaPagamento, iniciais, diasPara, titulo, resumo, mascaraEmail
  pages/       home, cadastro-evento, lista-eventos, participantes, nao-encontrado
entrega/       prints e respostas da atividade
```

## Observação

O projeto ainda não tem backend. Os dados ficam no `localStorage` do navegador, então
para começar do zero é só limpar os dados do site no navegador.

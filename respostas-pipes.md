# Respostas — Tarefa Pipes

**1. Por que não basta trocar 'cartao' por 'Cartão de crédito' dentro do objeto?**
Porque aí o dado guardado muda. O sistema (e o backend) espera `cartao`, então ao editar e salvar o participante iria `Cartão de crédito` para o banco, e o select de forma de pagamento nem ia reconhecer o valor. O pipe só muda o que aparece na tela, o objeto continua com `cartao`.

**2. Ler `{{ evento.titulo | slice:0:10 | uppercase }}`**
"Pegue evento.titulo, passe pelo slice usando 0 e 10, depois passe pelo uppercase."
Para 'Semana de Tecnologia' o slice pega os 10 primeiros caracteres ('Semana de ', com o espaço no final) e o uppercase deixa `SEMANA DE `.

**3. Por que o telefone devolve o valor original quando não reconhece?**
Porque assim o dado não some da tela. Se devolvesse '' a pessoa ia achar que o telefone não foi cadastrado, e 'inválido' esconde o que está escrito. Mostrando o original dá pra ver o que tem de errado e corrigir.

**4. Por que o diasPara recebe o hoje como parâmetro?**
Porque se o pipe usasse sempre `new Date()` lá dentro, o resultado dependeria do dia em que o teste roda. Um teste que espera "Faltam 10 dias" passaria hoje e quebraria amanhã. Passando o hoje fixo (10/11/2026) a tabela vale em qualquer dia.

**5. Por que "Hoje" não vira "Encerrado" à meia-noite com a tela aberta?**
Porque o pipe é puro: o Angular só chama o transform de novo quando o valor de entrada muda. A data do evento continua a mesma string, então ele reaproveita o resultado antigo. Só atualiza se recarregar a tela ou a data mudar.

**6. Mostrar só quem pagou por Pix: pipe ou computed?**
Computed. Filtrar a lista não é formatar o dado pra exibir, é regra/estado do componente, e o resultado pode ser usado em outros lugares (contar, por exemplo). Um pipe de filtro em array teria que ser impuro pra perceber itens novos e ia rodar a toda hora.

## Desafio 3 — mascaraEmail e LGPD
O e-mail é dado pessoal, e a LGPD pede que só seja exposto o necessário, então numa lista pública faz sentido esconder parte dele.
Mas o pipe só esconde na tela: o e-mail completo continua chegando no navegador (dá pra ver no Network/DevTools ou no localStorage). Pra proteger de verdade o backend é que não deveria mandar o dado.

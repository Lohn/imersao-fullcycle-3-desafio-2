# imersao-fullcycle-3-desafio-2

Necessário apenas digitar `docker-compose up`

O docker configura tudo automaticamente e inicia a api rest (nest.js) na porta 3000 e o frontend next.js na porta 3001

# imersao-fullcycle-3-desafio-3 

O desafio 3 consistia em portar o desafio 2 de docker-compose para kubernetes.

Todos os arquivos relacionados ao desafio 3 estão na pasta k8s

Para implementar o sistema foi criado um script que carrega todos os arquivos de configuração de uma vez

`cd k8s
./applyK8s.sh`

Os passos para a migração foram os seguintes:

## 1. Migrar o Postgresql
Eu acompanhei o desafio 2 dos outros colegas e percebi que quase ninguém implementou a persistência dos dados. (Bom, o desafio não pedia isso de qualquer forma). 
Mas, como eu fiz a implementação com o PSQL, precisava migrá-lo pro k8s primeiro. 
Sem maiores percalços. Perdi um tempinho para aprender a usar o configmap, só porque sim.

## 2. Migrar a API nest.js
Javascript/typescript não são a minha praia. Mas eu achei que seria só fazer uma imagem com o sistema dentro (ao invés de vinculado a um diretório, como no docker) que estava tudo 10.
Ledo engado. Erro de permissão, de variáveis e tudo o que possa imaginar. Até o migration parou de funcionar e só voltou quando coloquei pra ele apontar pro arquivo ts ao invés do js.
Bom, o maior problema aqui é justamente executar o migration a cada restart da api. 
Não é a solução mais elegante, mas garante que o BD estará sempre atualizado. 
[Todo: pesquisar sobre migrations em produção com kubernetes]

## 3. Migrar a frontend next.js
Esse eu achei que seria a maior dor de cabeça, mas foi tipo, no Dockerfile mandar um `npm install && npm run build` e no entrypoint largar um `npm start` e pronto.


## 4. GAMBIARRAS QUE MERECEM NOTA
O negócio tem que ligar na ordem, senão a API não faz o migration e se o next entrar antes da API também pode apresentar erro.
Então... dockerize fazendo suas mágicas.
A API aguarda a disposição TCP do BD e o Next aguarda a resposta HTTP da API. Não é o melhor sistema do mundo, mas para o fim que se destina até que ficou adequado.
O BD começou a apresentar a seguinte mensagem algumas vezes que fazia a primeira migração:
`error: function uuid_generate_v4() does not exist`

A solução, simples, segundo essa [issue da rocketseat](https://github.com/rocketseat-education/bootcamp-gostack-desafios/issues/48) é incluir essa linha no começo da primeira migration (Deu CERTO!):

`await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');`

## 5. Sugestões de melhorias
- Validar o objeto latlong na API
- Melhorar o sistema de manutenção das migrations
- Implementar um jeito menos 'gohorse' de copiar os fontes pra dentro das imagens docker (eu faço um clone, e copio as pastas pra cada contexto docker [ por quê? porque quando você inicia um build o docker copia todas os arquivos pra um ambiente temporário. Já percebeu que tem horas que ele demora um tempão pra começar o build? Pois é, diretórios grandes.])

Acho que é o que eu consigo pensar até o momento.

Obrigado pelo oportunidade. Realmente aprendi muito essa semana.


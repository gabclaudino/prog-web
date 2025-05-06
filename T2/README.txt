Aluno: Gabriel Claudino de Souza - GRR20215730
Disciplina: Programação Web - CI1010

Explicação:

Neste trabalho foi criado um Banco de Dados com as tabelas:
pessoas:
 - possui nome e sobrenome

documentos: relação 1:1 com pessoas
 - possui numero

enderecos: relação 1:N com pessoas
 - possui logradouro, cidade

projetos: 
 - nome do projeto

participacoes: relação N:N pessoas
 - referencia as pessoas aos projetos


Forma de executar:

1 - Primeiro é necessário criar o DB, para isso digite no terminal:

ruby db/criaDB.rb

2 - Insira os registros do arquivo registros.rb digitando:

ruby registro.rb

3 - Execute o main.rb para usar a linha de comando:

ruby main.rb

4 - Execute as operações disponíveis no sistema na forma como estão descritas(vai aparecer quando estiver sendo executado)

5 - Digite "sair" para sair do sistema


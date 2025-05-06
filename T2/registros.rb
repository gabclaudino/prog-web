require 'active_record'
require 'require_all'
require 'sqlite3'

# configura o db
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/database.sqlite3'
)

# carrega os models
require_all 'models'

# mapeia nome da tabela para classe
modelos = {
  'pessoas'       => Pessoa,
  'documentos'    => Documento,
  'enderecos'     => Endereco,
  'projetos'      => Projeto,
  'participacoes' => Participacao
}

# criacao de Pessoas
pessoa1 = Pessoa.create(nome: "Gabriel", sobrenome: "Souza")
pessoa2 = Pessoa.create(nome: "Bruno", sobrenome: "Muller")
pessoa3 = Pessoa.create(nome: "David", sobrenome: "Menotti")
pessoa4 = Pessoa.create(nome: "Eduardo", sobrenome: "Almeida")
pessoa5 = Pessoa.create(nome: "Eduardo", sobrenome: "Todt")
pessoa6 = Pessoa.create(nome: "Marcos", sobrenome: "Castilho")
pessoa7 = Pessoa.create(nome: "Marco", sobrenome: "Zanata")
pessoa8 = Pessoa.create(nome: "Renato", sobrenome: "Carmo")
pessoa9 = Pessoa.create(nome: "Armando", sobrenome: "Delgado")
pessoa10 = Pessoa.create(nome: "Andre", sobrenome: "Gregio")

# criacao de Documentos (1:1)
Documento.create(numero: "123456789", pessoa: pessoa1)
Documento.create(numero: "987654321", pessoa: pessoa2)
Documento.create(numero: "111223344", pessoa: pessoa3)
Documento.create(numero: "556677889", pessoa: pessoa4)
Documento.create(numero: "998877665", pessoa: pessoa5)
Documento.create(numero: "223344556", pessoa: pessoa6)
Documento.create(numero: "667788990", pessoa: pessoa7)
Documento.create(numero: "112233445", pessoa: pessoa8)
Documento.create(numero: "556677880", pessoa: pessoa9)
Documento.create(numero: "998877664", pessoa: pessoa10)

# criacao de Enderecos (1:N)
Endereco.create(logradouro: "Rua A, 000", cidade: "Mandirituba", pessoa: pessoa1)
Endereco.create(logradouro: "Rua B, 001", cidade: "Curitiba", pessoa: pessoa1)  
Endereco.create(logradouro: "Rua C, 010", cidade: "São Paulo", pessoa: pessoa2)
Endereco.create(logradouro: "Rua D, 011", cidade: "Rio de Janeiro", pessoa: pessoa3)
Endereco.create(logradouro: "Rua E, 100", cidade: "Belo Horizonte", pessoa: pessoa3)
Endereco.create(logradouro: "Rua F, 101", cidade: "Porto Alegre", pessoa: pessoa4)
Endereco.create(logradouro: "Rua G, 110", cidade: "Curitiba", pessoa: pessoa5)
Endereco.create(logradouro: "Rua H, 111", cidade: "Fortaleza", pessoa: pessoa6)
Endereco.create(logradouro: "Rua I, 002", cidade: "Fortaleza", pessoa: pessoa6)
Endereco.create(logradouro: "Rua J, 020", cidade: "Curitiba", pessoa: pessoa6)
Endereco.create(logradouro: "Rua K, 022", cidade: "Salvador", pessoa: pessoa7)
Endereco.create(logradouro: "Rua L, 200", cidade: "Recife", pessoa: pessoa8)
Endereco.create(logradouro: "Rua M, 202", cidade: "Manaus", pessoa: pessoa9)
Endereco.create(logradouro: "Rua N, 220", cidade: "Florianópolis", pessoa: pessoa10)
Endereco.create(logradouro: "Rua O, 222", cidade: "Curitiba", pessoa: pessoa10)

# Criação de Projetos
projeto1 = Projeto.create(nome: "Projeto X")
projeto2 = Projeto.create(nome: "Projeto Y")
projeto3 = Projeto.create(nome: "Projeto Z")

# Criação de Participações (N:N)
Participacao.create(pessoa: pessoa1, projeto: projeto1)
Participacao.create(pessoa: pessoa1, projeto: projeto2)
Participacao.create(pessoa: pessoa2, projeto: projeto2)
Participacao.create(pessoa: pessoa2, projeto: projeto3)
Participacao.create(pessoa: pessoa3, projeto: projeto3)
Participacao.create(pessoa: pessoa3, projeto: projeto2)
Participacao.create(pessoa: pessoa4, projeto: projeto1)
Participacao.create(pessoa: pessoa5, projeto: projeto2)
Participacao.create(pessoa: pessoa5, projeto: projeto3)
Participacao.create(pessoa: pessoa7, projeto: projeto2)
Participacao.create(pessoa: pessoa8, projeto: projeto1)
Participacao.create(pessoa: pessoa8, projeto: projeto2)
Participacao.create(pessoa: pessoa9, projeto: projeto1)
Participacao.create(pessoa: pessoa9, projeto: projeto2)
Participacao.create(pessoa: pessoa9, projeto: projeto3)
Participacao.create(pessoa: pessoa10, projeto: projeto2)


puts "Dados inseridos com sucesso!"

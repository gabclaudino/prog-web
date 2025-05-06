require 'active_record'
require 'require_all'
require 'sqlite3'

# Configura o banco
ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/database.sqlite3'
)

# Carrega os models
require_all 'models'

# Mapeia nome da tabela para classe
modelos = {
  'pessoas'       => Pessoa,
  'documentos'    => Documento,
  'enderecos'     => Endereco,
  'projetos'      => Projeto,
  'participacoes' => Participacao
}

puts "Bem-vindo ao sistema de banco de dados!"
puts "Digite comandos no formato:"
puts "  insere pessoas nome=\"João\" sobrenome=\"Silva\""
puts "  lista pessoas"
puts "  altera pessoas nome=\"João\" sobrenome=\"Souza\""
puts "  exclui pessoas nome=\"João\""
puts "Digite 'sair' para encerrar."
puts "-" * 50

loop do
  print "> "
  entrada = gets&.strip
  break if entrada.nil? || entrada.downcase == "sair"

  partes = entrada.scan(/(?:[^\s"]+|"[^"]*")+/)
  comando = partes.shift
  tabela  = partes.shift
  args = partes.map { |a| a.split('=') }.to_h.transform_values { |v| v.delete_prefix('"').delete_suffix('"') }

  modelo = modelos[tabela]

  unless modelo
    puts "Tabela '#{tabela}' não reconhecida."
    next
  end

  case comando
  when 'insere'
    registro = modelo.create(args)
    puts "Inserido: #{registro.inspect}"

  when 'altera'
    if args.empty?
      puts "Você precisa informar pelo menos um campo para alterar."
      next
    end
    chave = args.keys.first
    valor = args.delete(chave)
    encontrados = modelo.where(chave => valor)
    if encontrados.empty?
      puts "Nenhum registro encontrado para alteração."
    else
      encontrados.each { |r| r.update(args) }
      puts "Alterado #{encontrados.size} registro(s)."
    end

  when 'exclui'
    if args.empty?
      puts "Você precisa informar um campo para buscar e excluir."
      next
    end
    chave = args.keys.first
    valor = args[chave]
    deletados = modelo.where(chave => valor).destroy_all
    puts "Excluído(s) #{deletados.size} registro(s)."

  when 'lista'
    registros = modelo.all
    if registros.empty?
      puts "Nenhum registro encontrado."
    else
      registros.each { |r| puts r.attributes }
    end
  
  else
    puts "Comando '#{comando}' não reconhecido."
  end
end

puts "Programa encerrado. Até mais!"

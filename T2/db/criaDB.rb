require 'active_record'

ActiveRecord::Base.establish_connection(
  adapter: 'sqlite3',
  database: 'db/database.sqlite3'
)

ActiveRecord::Schema.define do
  create_table :pessoas, if_not_exists: true do |t|
    t.string :nome
    t.string :sobrenome
  end

  create_table :documentos, if_not_exists: true do |t|
    t.string :numero
    t.references :pessoa, foreign_key: true
  end

  create_table :enderecos, if_not_exists: true do |t|
    t.string :logradouro
    t.string :cidade
    t.references :pessoa, foreign_key: true
  end

  create_table :projetos, if_not_exists: true do |t|
    t.string :nome
  end

  create_table :participacoes, if_not_exists: true do |t|
    t.references :pessoa, foreign_key: true
    t.references :projeto, foreign_key: true
  end
end

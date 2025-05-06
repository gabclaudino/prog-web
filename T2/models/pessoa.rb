class Pessoa < ActiveRecord::Base
  has_one :documento, dependent: :destroy
  has_many :enderecos, dependent: :destroy
  has_many :participacoes, class_name: "Participacao", dependent: :destroy
  has_many :projetos, through: :participacoes
end

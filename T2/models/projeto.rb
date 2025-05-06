class Projeto < ActiveRecord::Base
  has_many :participacoes, dependent: :destroy
  has_many :pessoas, through: :participacoes
end
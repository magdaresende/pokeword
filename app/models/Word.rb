class Word < ApplicationRecord
    validates :pokename, presence: true
    validates :poketype, presence: true
end

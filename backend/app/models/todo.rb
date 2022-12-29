class Todo < ApplicationRecord
    belongs_to :user
    validates :todo, presence: true, length: { maximum: 140 }
end

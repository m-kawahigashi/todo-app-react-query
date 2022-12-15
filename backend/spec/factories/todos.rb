FactoryBot.define do
  factory :todo do
    todo { "sample_todo" }
    completeflag { false }
    association :user
  end
end

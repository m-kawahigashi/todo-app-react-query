FactoryBot.define do
  factory :user do
    name { Faker::Name.name }
    sequence(:email) { |n| "#{n}_" + Faker::Internet.email }
    password { Faker::Internet.password(8) }
  end

  factory :registration_user, class: User do
    name { Faker::Name.name }
    email { "testuser@example.com" }
    password { "testuser" }
    password_confirmation { "testuser" }
  end

end

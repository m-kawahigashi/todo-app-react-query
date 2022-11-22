require 'rails_helper'

RSpec.describe User, type: :model do

    it "email、passwordが存在する場合、登録される" do
      user = FactoryBot.build(:user)
      expect(user).to be_valid
    end

    it "emailが存在しない場合は登録できず、エラーとなる" do
      user = FactoryBot.build(:user, email: nil)
      user.valid?
      expect(user.errors[:email]).to include("can't be blank")
    end

    it "email内容が重複している場合は登録できず、エラーとなる" do
      user1 = FactoryBot.create(:user, email: "test1@example.com", password: "password1")
      expect(FactoryBot.build(:user, email: user1.email, password: "password2")).to_not be_valid
    end

    it "passwordが存在しない場合は登録できず、エラーとなる" do
      user = FactoryBot.build(:user, password: nil)
      user.valid?
      expect(user.errors[:password]).to include("can't be blank")
    end

    it "password内容が重複している場合は登録できず、エラーとなる" do
      user1 = FactoryBot.create(:user, email: "test1@example.com", password: "password1")
      expect(FactoryBot.build(:user, email: "test2@example.com", password: user1.password)).to_not be_valid
    end

    it "password_confirmationとpasswordが異なる場合保存できない" do
      expect(FactoryBot.build(:user, password:"password1", password_confirmation: "password2")).to_not be_valid
    end

    it "passwordが6文字未満であれば登録できない" do
      expect(FactoryBot.build(:user, password: "12345", password_confirmation: "12345")).to_not be_valid
    end

    it "passwordが6文字以上であれば登録される" do
      expect(FactoryBot.build(:user, password: "123456", password_confirmation: "123456")).to be_valid
    end

end

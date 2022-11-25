require 'rails_helper'

RSpec.describe User, type: :model do
  describe "ユーザー登録処理確認　（model /api/v1/auth）" do

    context "email、passwordが存在する場合" do
      let(:user) { build(:user) }

      it "登録される" do
        expect(user).to be_valid
      end
    end

    context "emailが存在しない場合" do
      let(:user) { build(:user, email: nil) }

      it "登録できず、エラーとなる" do
        user.valid?
        expect(user.errors[:email]).to include("can't be blank")
      end
    end

    context "email内容が重複している場合" do
      let(:user1) { create(:user) }
      let(:user2) { build(:user, email: user1.email) }

      it "登録できず、エラーとなる" do
        user2.valid?
        expect(user2.errors.messages[:email]).to include("has already been taken")
      end
    end

    context "passwordが存在しない場合" do
      let(:user) { build(:user, password: nil) }

      it "登録できず、エラーとなる" do
        user.valid?
        expect(user.errors[:password]).to include("can't be blank")
      end
    end

    # context "password内容が重複している場合" do
    #   let(:user1) { create(:user) }
    #   let(:user2) { build(:user, email: "testuser@example.com", password: user1.password) }

    #   it "登録できず、エラーとなる" do
    #     user2.valid?
    #     expect(user2.errors.messages[:password]).to include "has already been taken"
    #   end
    # end

    context "password_confirmationとpasswordが異なる場合" do
      it "登録できず、エラーとなる" do
        expect(build(:user, password:"password1", password_confirmation: "password2")).to_not be_valid
      end
    end

    context "passwordが6文字未満の場合" do
      it "登録できず、エラーとなる" do
        expect(build(:user, password: "1" * 5, password_confirmation: "1" * 5)).to_not be_valid
      end
    end

    context "passwordが6文字以上の場合" do
      it "登録される" do
        expect(build(:user, password: "1" * 6, password_confirmation: "1" * 6)).to be_valid
      end
    end

  end
end

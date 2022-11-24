require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
    describe "ユーザー登録処理確認　（POST /api/v1/auth）" do
        params = FactoryBot.attributes_for(:registration_user)
        subject { post(api_v1_user_registration_path, params: params) }

        it "email、passwordが存在する場合、登録される" do
            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(200)
            expect(res["status"]).to eq("success")
            expect(res["data"]["name"]).to eq(User.last.name)
            expect(res["data"]["email"]).to eq(User.last.email)
            expect(res["data"]["password"]).to eq(User.last.password)
        end

        it "emailが存在しない場合は登録できず、エラーとなる" do
            params = FactoryBot.attributes_for(:registration_user, email: nil)

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(422)
            expect(res["status"]).to eq("error")
            expect(res["errors"]["full_messages"]).to include("Email can't be blank")
        end

        it "email内容が重複している場合は登録できず、エラーとなる" do
            user1 = FactoryBot.create(:registration_user)
            params = FactoryBot.attributes_for(:registration_user, email: user1.email, password: "adminuser1", password_confirmation: "adminuser1")

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(422)
            expect(res["status"]).to eq("error")
            expect(res["errors"]["full_messages"]).to include("Email has already been taken")
        end

        it "passwordが存在しない場合は登録できず、エラーとなる" do
            params = FactoryBot.attributes_for(:registration_user, password: nil)

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(422)
            expect(res["status"]).to eq("error")
            expect(res["errors"]["full_messages"]).to include("Password can't be blank")
        end

        # it "password内容が重複している場合は登録できず、エラーとなる" do
        #     user1 = FactoryBot.create(:registration_user)
        #     params = FactoryBot.attributes_for(:registration_user, email: "adminuser1@example.com", password: user1.password, password_confirmation: user1.password)

        #     subject
        #     res = JSON.parse(response.body)

        #     expect(response).to have_http_status(422)
        #     expect(res["status"]).to eq("error")
        #     expect(res["errors"]["full_messages"]).to include("Password has already been taken")
        # end

        it "password_confirmationとpasswordが異なる場合は登録されない" do
            params = FactoryBot.attributes_for(:registration_user, password_confirmation: "adminuser")

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(422)
            expect(res["status"]).to eq("error")
            expect(res["errors"]["full_messages"]).to include("Password confirmation doesn't match Password")
        end

        it "passwordが6文字未満であれば登録できない" do
            params = FactoryBot.attributes_for(:registration_user, password: "12345" ,password_confirmation: "12345")

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(422)
            expect(res["status"]).to eq("error")
            expect(res["errors"]["full_messages"]).to include("Password is too short (minimum is 6 characters)")
        end

        it "passwordが6文字以上であれば登録される" do
            params = FactoryBot.attributes_for(:registration_user, password: "123456" ,password_confirmation: "123456")

            subject
            res = JSON.parse(response.body)

            expect(response).to have_http_status(200)
            expect(res["status"]).to eq("success")
            expect(res["data"]["name"]).to eq(User.last.name)
            expect(res["data"]["email"]).to eq(User.last.email)
            expect(res["data"]["password"]).to eq(User.last.password)
        end

    end

end
require "rails_helper"

RSpec.describe "Api::V1::Auth::Registrations", type: :request do
    describe "ユーザー登録処理確認　（POST /api/v1/auth）" do
        subject { post(api_v1_user_registration_path, params: params) }

        context "email、passwordが存在する場合" do
            let(:params) { attributes_for(:registration_user) }

            it "登録される" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(200)
                expect(res["status"]).to eq("success")
                expect(res["data"]["name"]).to eq(User.last.name)
                expect(res["data"]["email"]).to eq(User.last.email)
                expect(res["data"]["password"]).to eq(User.last.password)
            end
        end

        context "emailが存在しない場合" do
            let(:params) { attributes_for(:registration_user, email: nil) }

            it "登録できずエラーとなる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(422)
                expect(res["status"]).to eq("error")
                expect(res["errors"]["full_messages"]).to include("Email can't be blank")
            end
        end

        context "email内容が重複している場合" do
            let(:user1) { create(:registration_user) }
            let(:params) { attributes_for(:registration_user, email: user1.email, password: "adminuser1", password_confirmation: "adminuser1") }

            it "登録できず、エラーとなる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(422)
                expect(res["status"]).to eq("error")
                expect(res["errors"]["full_messages"]).to include("Email has already been taken")
            end
        end

        context "passwordが存在しない場合" do
            let(:params) { attributes_for(:registration_user, password: nil) }

            it "登録できず、エラーとなる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(422)
                expect(res["status"]).to eq("error")
                expect(res["errors"]["full_messages"]).to include("Password can't be blank")
            end
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

        context "password_confirmationとpasswordが異なる場合" do
            let(:params) { attributes_for(:registration_user, password_confirmation: "adminuser") }

            it "登録されない" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(422)
                expect(res["status"]).to eq("error")
                expect(res["errors"]["full_messages"]).to include("Password confirmation doesn't match Password")
            end
        end

        context "passwordが6文字未満の場合" do
            let(:params) { attributes_for(:registration_user, password: "1" * 5 ,password_confirmation: "1" * 5) }

            it "登録できない" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(422)
                expect(res["status"]).to eq("error")
                expect(res["errors"]["full_messages"]).to include("Password is too short (minimum is 6 characters)")
            end
        end

        context "passwordが6文字以上の場合" do
            let(:params) { attributes_for(:registration_user, password: "1" * 6 ,password_confirmation: "1" * 6) }

            it "登録される" do
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
end
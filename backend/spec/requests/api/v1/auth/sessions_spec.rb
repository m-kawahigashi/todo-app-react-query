require "rails_helper"

RSpec.describe "Api::V1::Auth::Sessions", type: :request do
    describe "ログイン処理確認　（POST /api/v1/auth/sign_in）" do
        subject { post(api_v1_user_session_path, params: params) }

        context "email、passwordが正しい場合" do
            let(:current_user) { create(:login_user) }
            let(:params) { { email: current_user.email, password: current_user.password } }

            it "ログインできる" do
                subject
                expect(response.headers["uid"]).to be_present
                expect(response.headers["access-token"]).to be_present
                expect(response.headers["client"]).to be_present
                expect(response).to have_http_status(200)
            end
        end

        context "emailが正しくない場合" do
            let(:current_user) { create(:login_user) }
            let(:params) { { email: "adminuser@example.com", password: current_user.password } }

            it "ログインできずエラーとなる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(401)
                expect(res["success"]).to be_falsey
                expect(res["errors"]).to include("Invalid login credentials. Please try again.")
                expect(response.headers["uid"]).to be_blank
                expect(response.headers["access-token"]).to be_blank
                expect(response.headers["client"]).to be_blank
            end
        end

        context "パスワードが正しくない場合" do
            let(:current_user) { create(:login_user) }
            let(:params) { { email: current_user.email, password: "adminuser" } }

            it "ログインできずエラーとなる" do
                subject
                res = JSON.parse(response.body)

                expect(res["success"]).to be_falsey
                expect(res["errors"]).to include("Invalid login credentials. Please try again.")
                expect(response.headers["uid"]).to be_blank
                expect(response.headers["access-token"]).to be_blank
                expect(response.headers["client"]).to be_blank
                expect(response).to have_http_status(401)
            end
        end
    end

    describe "ログアウト処理確認　（DELETE /api/v1/auth/sign_out）" do
        subject { delete(destroy_api_v1_user_session_path, headers: headers) }

        context "ユーザーがログインしている場合" do
            let(:current_user) { create(:login_user) }
            let(:headers) { current_user.create_new_auth_token }

            fit "ログアウトできる" do
                subject
                res = JSON.parse(response.body)
                expect(res["success"]).to be_truthy
                expect(current_user.reload.tokens).to be_blank
                expect(response).to have_http_status(200)
            end
        end
    end
end
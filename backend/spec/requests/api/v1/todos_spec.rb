require 'rails_helper'

RSpec.describe "Api::V1::Todos", type: :request do
    describe "取得確認 (get /api/v1)" do
        subject { get(api_v1_todos_path, headers: headers) }

        context "index" do

            let!(:current_user) { create(:login_user, id: "0") }
            let!(:todo) { create_list(:todo, 3, user_id: current_user.id) }

            let(:headers) { current_user.create_new_auth_token }

            it "todo一覧を取得できる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(200)
                expect(res["todos"].length).to eq(3)
            end
        end
    end

    describe "登録確認 (post /api/v1)" do
        subject { post(api_v1_todos_path, params: params) }

        context "todo、user_idが存在する場合" do
            let(:current_user) { create(:login_user, id: "0") }
            let(:params) { attributes_for(:todo, user_id: current_user.id) }

            it "登録される" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(200)
                expect(res["todo"]["todo"]).to eq(Todo.last.todo)
                expect(res["todo"]["completeflag"]).to eq(Todo.last.completeflag)
                expect(res["todo"]["user_id"]).to eq(Todo.last.user_id)
            end
        end
    end

    describe "削除確認 (delete /api/v1)" do
        subject { delete(api_v1_todo_path(id: id)) }

        context "destroy" do
            let!(:current_user) { create(:login_user, id: "0") }
            let!(:delete_todo) { create(:todo, id: "0", user_id: current_user.id) }
            let(:id) { { id: delete_todo.id } }

            it "削除できる" do
                subject
                res = JSON.parse(response.body)

                expect(response).to have_http_status(200)
            end
        end
    end

end

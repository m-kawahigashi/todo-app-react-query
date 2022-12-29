class Api::V1::TodosController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_todo, only: [:edit, :update, :destroy]

    def index
        render json: { status: 200, todos: Todo.where(user_id: current_api_v1_user.id) }
    end

    def create
        @todo = Todo.new(todo_params)

        begin
            @todo.save!
        rescue
            render json: { status: 500, message: "Todoの作成に失敗しました" }
        end
        render json: { status: 200, todo: @todo }
    end

    def edit
    end

    def update
        begin
            @current_todo.update!(todo_params)
        rescue
            render json: { status: 500, message: "Todoの更新に失敗しました" }
        end
        render json: { status: 200, todo: @current_todo }
    end

    def destroy
        # if @current_todo.id == current_api_v1_user
        begin
            @current_todo.destroy!
        rescue
            render json: { status: 500, message: "Todoの削除に失敗しました" }
        end
        render json: { status: 200, todo: @current_todo }
    end

    private
    def todo_params
        params.permit(:todo, :user_id)
    end

    def set_todo
        @current_todo = Todo.find(params[:id])
    end

end
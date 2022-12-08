class Api::V1::TodosController < ApplicationController
    # before_action :authenticate_user!
    before_action :set_todo, only: [:edit, :update, :destroy]

    def index
        # render json: { status: 200, todos: Todo.where(user_id: current_api_v1_user.id).order('id DESC')  }
        render json: { status: 200, todos: Todo.where(user_id: 1).order('id DESC')  }
    end

    def create
        @todo = Todo.new(todo_params)

        if @todo.save
            render json: { status: 200, todo: @todo }
        else
            render json: { status: 500, message: "Todoの作成に失敗しました" }
        end
    end

    def edit
    end

    def update
        if @current_todo.update(todo_params)
            render json: { status: 200, todo: @current_todo }
        else
            render json: { status: 500, message: "Todoの更新に失敗しました" }
        end
    end

    def destroy
        # if @current_todo.id == current_api_v1_user
        if @current_todo.destroy
            # @todo.destroy
            render json: { status: 200, todo: @current_todo }
        else
            render json: { status: 500, message: "Todoの削除に失敗しました" }
        end
    end

    private
    def todo_params
        # params.require(:todo).permit(:todo).merge(:user_id: current_api_v1_user.id)
        # params.permit(:todo).merge(user_id: current_api_v1_user.id)
        params.permit(:todo, :user_id)
    end

    def set_todo
        @current_todo = Todo.find(params[:id])
    end

end
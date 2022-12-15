require 'rails_helper'

RSpec.describe Todo, type: :model do
  describe "todo確認 (model /api/v1/todos_controller)" do

    describe "登録確認" do
      context "todo、user_idが存在する場合" do
        let(:todo) { build(:todo) }

        it "登録される" do
          expect(todo).to be_valid
        end
      end

      context "todoが存在しない場合" do
        let(:todo) { build(:todo, todo: nil ) }

        it "登録できず、エラーとなる" do
          todo.valid?
          expect(todo.errors[:todo]).to include("can't be blank")
        end
      end

      context "todoが140文字の場合" do
        let(:todo) { build(:todo, todo: "a" * 140) }

        it "登録できる" do
          todo.valid?
          expect(todo).to be_valid
        end
      end

      context "todoが141文字の場合" do
        let(:todo) { build(:todo, todo: "a" * 141) }

        it "登録できず、エラーとなる" do
          expect(todo.valid?).to eq false;
        end
      end
    end

    describe "アソシエーション確認" do
      context "Userモデルとの関係" do
        it "1対多となっていること" do
          expect(Todo.reflect_on_association(:user).macro).to eq :belongs_to
        end
      end
    end
  end
end

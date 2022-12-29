class CreateTodos < ActiveRecord::Migration[5.2]
  def change
    create_table :todos do |t|
      # todoの内容
      t.text :todo, null: false
      # todo完了フラグ
      t.boolean :completeflag, null: false, default: false
      # 外部キー(user_id)
      t.references :user, foreign_key: true
      t.timestamps
    end
  end
end

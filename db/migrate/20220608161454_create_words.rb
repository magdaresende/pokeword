class CreateWords < ActiveRecord::Migration[7.0]
  def change
    create_table :words do |t|
      t.string :pokename
      t.string :poketype, array: true
      t.timestamps
    end
  end
end

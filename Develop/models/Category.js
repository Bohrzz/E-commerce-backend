const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Category extends Model {}

Category.init(
  {
    // define columns

    id:{
      primaryKey:true,
      autoIncrement:true,
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category_name:{
      type: DataTypes.STRING,
      allowNull: false,
    },

  

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'category',
  }
);

module.exports = Category;

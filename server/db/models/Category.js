// Category Schema
export default (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    category: {
      type: DataTypes.TEXT,
      unique: true,
    }
  });

  return Category;
}
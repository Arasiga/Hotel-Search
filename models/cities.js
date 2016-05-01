'use strict';
module.exports = function(sequelize, DataTypes) {
  var cities = sequelize.define('cities', {
    city: DataTypes.STRING,
    checkdatesID: DataTypes.INTEGER,
    checkdateID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        cities.hasMany(models.hotels);
        cities.belongsTo(models.checkdates);
      }
    }
  });
  return cities;
};
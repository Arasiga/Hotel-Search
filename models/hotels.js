'use strict';
module.exports = function(sequelize, DataTypes) {
  var hotels = sequelize.define('hotels', {
    hotels: DataTypes.STRING,
    citiesID: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        hotels.belongsTo(models.cities);
      }
    }
  });
  return hotels;
};
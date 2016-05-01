'use strict';
module.exports = function(sequelize, DataTypes) {
  var checkdates = sequelize.define('checkdates', {
    dates: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        checkdates.hasMany(models.cities);
      }
    }
  });
  return checkdates;
};
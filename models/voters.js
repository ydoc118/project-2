/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  const Voter_id = sequelize.define("Voter_id", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registered: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    address_one: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address_two: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false
    },
    zip: {
      type: DataTypes.STRING,
      allowNull: false
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false
    },
    d_license: {
      type: DataTypes.STRING,
      allowNull: false
    },
    registration_id: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null
    },
    voted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
  return Voter_id;
};

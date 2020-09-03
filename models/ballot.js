/* eslint-disable camelcase */
module.exports = function(sequelize, DataTypes) {
  const Voter_response = sequelize.define("Voter_response", {
    user_id: {
      type: DataTypes.STRING,
      allowNull: false
    },
    completed_ballot: {
      type: DataTypes.BLOB,
      allowNull: false
    }
  });
  return Voter_response;
};

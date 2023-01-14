const UserDataContract = artifacts.require("UserData");

module.exports = function (deployer) {
  deployer.deploy(UserDataContract);
};

// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "./Owned.sol";
import "./IFaucet.sol";

// difference between public and external is that latter just allows function calls from outside
// whereas former allows function calls from within as well.
contract Faucet is Owned, IFaucet {
    uint public fundersCounter;
    mapping(address => bool) funders;
    mapping(uint => address) fundersMapping;
    // address[] private funders;

    modifier limitWithdraw(uint withdrawAmount) {
        require(withdrawAmount <= 1000000000000000000, "Too high value, try lowering it or withdraw it in increments.");
        _;
    }

    receive() external payable {}

    function addFunds() external override payable {
        address funder = msg.sender;
        if (!funders[funder]) {
            fundersMapping[fundersCounter] = funder;
            fundersCounter += 1;
            funders[funder] = true;
        }
    }

    function test1() external onlyOwner {
        // only admin
    }

    function test2() external onlyOwner {
        // only admin
    }

    function withdraw(uint withdrawAmount) external override limitWithdraw(withdrawAmount) {
        payable(msg.sender).transfer(withdrawAmount);
    }

    function getFunderAtIndex(uint8 index) external view returns(address) {
        // address[] memory _funderList = getAllFunders();
        return fundersMapping[index];
    }

    function getAllFunders() external view returns(address[] memory) {
        address[] memory _funderList = new address[](fundersCounter);

        for(uint i = 0; i < fundersCounter; i++) {
            _funderList[i] = fundersMapping[i];
        }
        return _funderList;
    }
}


// truffle console
// const instance = await Faucet.deployed()
// const result = await instance.
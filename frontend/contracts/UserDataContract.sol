// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

// difference between public and external is that latter just allows function calls from outside
// whereas former allows function calls from within as well.
contract UserData {
    uint public userDataIndexCounter;
    bytes32[] private userData;

    function storeUserData(bytes32 userDataHash) external returns(bytes32) {
        userData.push(userDataHash);
        userDataIndexCounter += 1;
        return blockhash(block.number);
    }
}


// truffle console
// const instance = await Faucet.deployed()
// const result = await instance.
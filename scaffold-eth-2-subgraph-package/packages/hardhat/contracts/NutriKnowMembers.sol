// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract address 0x4C3139A3bDf6AeC62d8b65B053e41cd738b41e8F in Base Sepolia

contract MemberManagement {
    struct Member {
        uint height;
        uint weight;
        uint bornYear;
    }

    enum Role { Admin, Nutritionist, User }

    // Events
    event MemberAdded(address indexed memberAddress, uint height, uint weight, uint bornYear, Role role);
    event MemberRoleChanged(address indexed memberAddress, Role newRole);

    mapping(address => Member) public members;
    mapping(address => Role) public roles;
    address public owner;

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Only admins can perform this action");
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin; // Setting the contract deployer as an Admin
        // Emitting an event for the contract deployer being added as an Admin
        emit MemberAdded(msg.sender, 0, 0, 0, Role.Admin);
    }

    function addMember(address _memberAddress, uint _height, uint _weight, uint _bornYear, Role _role) public onlyAdmin {
        members[_memberAddress] = Member(_height, _weight, _bornYear);
        roles[_memberAddress] = _role;
        // Emit an event when a new member is added
        emit MemberAdded(_memberAddress, _height, _weight, _bornYear, _role);
    }

    function setMemberRole(address _memberAddress, Role _newRole) public onlyAdmin {
        require(_memberAddress != owner, "Cannot change the role of the contract owner");
        roles[_memberAddress] = _newRole;
        // Emit an event when a member's role is changed
        emit MemberRoleChanged(_memberAddress, _newRole);
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

// contract address 0xBCAeC92fb15A22a02886bb5d17593837b8959D62 in Sepolia
// contract address 0x2f302E1604E3657035C1EADa450582fA4417f598 in Base Sepolia
// contract address 0xf1D63b42fb8c4887d6deB34c5fba81B18Bd2e3Ea in Arbitrum Sepolia

contract MemberManagement {
    struct Member {
        uint height;
        uint weight;
        uint bornYear;
    }

    enum Role { Admin, Nutritionist, User }

    event MemberAdded(address indexed memberAddress, uint height, uint weight, uint bornYear, Role role);
    event MemberRoleChanged(address indexed memberAddress, Role newRole);
    event MemberUpdated(address indexed memberAddress, uint height, uint weight, uint bornYear);
    event MemberRegistered(address indexed memberAddress, uint height, uint weight, uint bornYear, Role role);

    mapping(address => Member) public members;
    mapping(address => Role) public roles;
    address public owner;

    modifier onlyAdmin() {
        require(roles[msg.sender] == Role.Admin, "Only admins can perform this action");
        _;
    }

    modifier adminOrMember(address _memberAddress) {
        require(
            msg.sender == _memberAddress || roles[msg.sender] == Role.Admin,
            "Only the member or an admin can perform this action"
        );
        _;
    }

    constructor() {
        owner = msg.sender;
        roles[msg.sender] = Role.Admin;
        emit MemberAdded(msg.sender, 0, 0, 0, Role.Admin);
    }

    function registerMember() public {
        // Check if the member already exists (default role is assumed to be 0 for non-existing members)
        require(roles[msg.sender] == Role(0), "Member already registered.");

        // Register the new member with default values
        members[msg.sender] = Member(0, 0, 0); // Assuming 0 as default values for height, weight, and bornYear
        roles[msg.sender] = Role.User; // Assigning a default role of User

        // Emit an event with the new member information
        emit MemberRegistered(msg.sender, 0, 0, 0, Role.User);
    }

    function addMember(address _memberAddress, uint _height, uint _weight, uint _bornYear, Role _role) public onlyAdmin {
        members[_memberAddress] = Member(_height, _weight, _bornYear);
        roles[_memberAddress] = _role;
        emit MemberAdded(_memberAddress, _height, _weight, _bornYear, _role);
    }

    function setMemberRole(address _memberAddress, Role _newRole) public onlyAdmin {
        require(_memberAddress != owner, "Cannot change the role of the contract owner");
        roles[_memberAddress] = _newRole;
        emit MemberRoleChanged(_memberAddress, _newRole);
    }

    function updateMember(address _memberAddress, uint _height, uint _weight, uint _bornYear) public adminOrMember(_memberAddress) {
        members[_memberAddress].height = _height;
        members[_memberAddress].weight = _weight;
        members[_memberAddress].bornYear = _bornYear;
        emit MemberUpdated(_memberAddress, _height, _weight, _bornYear);
    }

    function getMemberDetails(address _memberAddress) public view returns (uint, uint, uint) {
        Member memory member = members[_memberAddress];
        return (member.height, member.weight, member.bornYear);
    }
    
}

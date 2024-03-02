// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// contract address 0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8 in Base Sepolia

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

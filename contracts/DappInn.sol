//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DappInn {

    enum RoomStatus { Vacant, Occupied }

    uint8 public numberOfRooms = 10;

    uint public roomPriceInWei = 100;

    address public owner;

    struct Room {
        RoomStatus status;
        address guest;
        uint checkoutDate;
    }

    constructor() {
        owner = address(msg.sender);
    }

    modifier onlyOwner {
        require(address(msg.sender) == owner, "Not owner");
        _;
    }

    mapping(uint8 => Room) public rooms;

    function setRoomPrice(uint _price) public onlyOwner {
        require(_price > 0, "Money doesn't grow on trees");
        roomPriceInWei = _price; 
    }

    function setNumberOfRooms(uint8 _numberOfRooms) public onlyOwner {
        numberOfRooms = _numberOfRooms;
    }

    function withdrawAll() public onlyOwner {
        require(address(this).balance > 0, "I'm broke, sorry...");
        payable(msg.sender).transfer(address(this).balance);
    }

    function balance() public  onlyOwner view returns (uint) {
        return address(this).balance;
    }

    function checkIn(uint8 _roomNumber, uint8 _timeToStay) public payable {

        require(_timeToStay > 0, "You have to stay at least one period");
        require(msg.value >= (roomPriceInWei * _timeToStay), "Not enough money");
        require(_roomNumber < numberOfRooms, "This room does not exists");

        // check if the room is occupied when checkoutDate is in the past.
        if (block.timestamp > rooms[_roomNumber].checkoutDate ) {
            require(rooms[_roomNumber].status == RoomStatus.Vacant, "This room is occupied");
        }

        rooms[_roomNumber].status = RoomStatus.Occupied;
        rooms[_roomNumber].guest = address(msg.sender);

        uint timeToStay = block.timestamp + ((1 seconds) * _timeToStay );
        
        rooms[_roomNumber].checkoutDate = timeToStay;
    }

    function getTimeStamp() public view returns(uint) {
        return block.timestamp;
    }

    function checkOut(uint8 _roomNumber) public {

        require(rooms[_roomNumber].guest == address(msg.sender), "you are not in the room");
        require(rooms[_roomNumber].status == RoomStatus.Occupied, "This room is not occupied");

        rooms[_roomNumber].status = RoomStatus.Vacant;
        rooms[_roomNumber].guest = address(0);
        rooms[_roomNumber].checkoutDate = block.timestamp;

    }
}
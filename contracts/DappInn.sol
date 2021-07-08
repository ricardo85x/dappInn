//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DappInn {

    enum RoomStatus { Vacant, Occupied }

    uint8 public numberOfRooms = 10;

    struct Room {
        RoomStatus status;
        address guest;
        uint checkoutDate;
    }


    mapping(uint8 => Room) public rooms;

    function checkIn(uint8 _roomNumber, uint8 _timeToStay) public {

        require(_roomNumber < numberOfRooms, "This room does not exists");
        require(_timeToStay > 0, "You have to stay at least one period");

        // check if the room is occupied when checkoutDate is in the past.
        if (block.timestamp > rooms[_roomNumber].checkoutDate ) {
            require(rooms[_roomNumber].status == RoomStatus.Vacant, "This room is occupied");
        }

        rooms[_roomNumber].status = RoomStatus.Occupied;
        rooms[_roomNumber].guest = address(msg.sender);

        uint timeToStay = block.timestamp;

        for(uint8 i = 0; i < _timeToStay ; i++) {
            timeToStay+= 1 minutes;
        }

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
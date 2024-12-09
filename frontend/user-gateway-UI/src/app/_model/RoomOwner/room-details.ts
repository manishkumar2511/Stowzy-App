import { StowzyDocuments } from "./business-documents";
import { Room } from "./room";
import { RoomOwner } from "./room-owner";

export interface RoomOwnerRegistration {         
    roomOwner: RoomOwner;          
    room: Room;
    stowzyDocuments:StowzyDocuments   
}
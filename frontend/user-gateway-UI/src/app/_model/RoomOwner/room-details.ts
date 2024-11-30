import { BusinessDocuments } from "./business-documents";
import { Room } from "./room";
import { RoomOwner } from "./room-owner";

export interface RoomDetails {
    RoomDetailsId: string;                
    Owner: RoomOwner;           
    Documents: BusinessDocuments; 
    Room: Room;    
}
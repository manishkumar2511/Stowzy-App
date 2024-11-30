export interface Room {
    RoomId:string,
    BusinessName: string;
    BusinessType: string;
    NoOfRooms: number;
    RoomSize: string;
    SecurityMeasures: string;
    HourlyRentalPrice: number;
    StreetAddress: string;
    Landmark?: string;
    Country: string;
    State: string;
    City: string;
    PostalCode: string;
    CurrentLocation: string;
}
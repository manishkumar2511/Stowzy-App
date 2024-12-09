export interface Room {
    roomId: string;
    businessName: string;
    businessType: string;
    noOfRooms: number;
    roomSize: string;
    securityMeasures: string;
    hourlyRentalPrice: number;
    streetAddress: string;
    landmark?: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    currentLocation: string;
}

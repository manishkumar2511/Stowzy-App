export interface RoomOwner {
    RoomOwnerId: string;
    Title: string,
    FirstName: string,
    LastName?: string,
    DateOfBirth: Date,
    Gender: string,
    PhoneNumber: number,
    SecondryNumber?: number,
    Email: string,
    IsActive: boolean,
    CreatedDate: Date,
    ModifiedDate: Date,
    IsDeleted: boolean,
    StreetAddress: string,
    Landmark?: string,
    Country: string,
    State: string,
    City: string,
    PostalCode: number,
    ProfileImage?: string,
    Role?: string;
}
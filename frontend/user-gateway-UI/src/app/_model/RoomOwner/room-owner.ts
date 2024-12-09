export interface RoomOwner {
    RoomOwnerId: string;
    Title: string,
    FirstName: string,
    LastName?: string,
    DateOfBirth: Date,
    Gender: string,
    PhoneNumber: string,
    SecondryNumber?: string,
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
    PostalCode: string,
    ProfileImage?: File,
    Role?: string;
}
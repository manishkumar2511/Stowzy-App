export interface RoomOwner {
    roomOwnerId: string;
    title: string;
    firstName: string;
    lastName?: string;
    dateOfBirth: Date;
    gender: string;
    phoneNumber: string;
    secondaryNumber?: string;
    email: string;
    isActive: boolean;
    createdDate: Date;
    modifiedDate: Date;
    isDeleted: boolean;
    streetAddress: string;
    landmark?: string;
    country: string;
    state: string;
    city: string;
    postalCode: string;
    profileImage?: File;
    role?: string;
}

export type UserSchema = {
    _id: string
    username: string;
    name: string;
    email: string;
    profilePic?: string;
    createdAt: Date;
    updatedAt?: Date;
}
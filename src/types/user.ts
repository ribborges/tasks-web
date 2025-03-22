export type UserSchema = {
    id: string
    username: string;
    name: string;
    email: string;
    profilePic?: string;
    createdAt: Date;
    updatedAt?: Date;
}
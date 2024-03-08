export interface story {
    id: string;
    title: string;
    synopsis: string;
    storyText: string[];
    creator: string;
    genres: string[];
    createdAt: Date
}




export interface user {
    firstName: string;
    lastName: string;
    username: string,
    bio: string,
    dateOfBirth: string,
    profileImage?: string | ""
}
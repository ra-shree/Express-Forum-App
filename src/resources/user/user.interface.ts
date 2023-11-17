import PostInterface from "@/resources/post/post.interface";

interface UserInterface {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    posts?: PostInterface[];
}

export default UserInterface;
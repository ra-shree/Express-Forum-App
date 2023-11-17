import Post from "@/resources/post/post.model";

interface UserInterface {
    id?: number;
    name?: string;
    email?: string;
    password?: string;
    createdAt?: Date;
    updatedAt?: Date;
    posts?: Post[];
}

export default UserInterface;
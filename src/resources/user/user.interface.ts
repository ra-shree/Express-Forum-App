import Post from "@/resources/post/post.model";

interface User {
    id: number;
    name?: string;
    email: string;
    password: string;
    createdAt?: string;
    updatedAt?: string;
    posts?: Post[];
}

export default User;
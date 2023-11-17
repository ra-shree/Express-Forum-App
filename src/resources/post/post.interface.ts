import User from "@/resources/user/user.model";

interface Post {
    id: number;
    title: string;
    excerpt: string;
    body: string;
    createdAt?: string;
    updatedAt?: string;
    user?: User
}

export default Post;
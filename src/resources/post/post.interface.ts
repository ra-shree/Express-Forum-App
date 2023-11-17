import UserInterface from "@/resources/user/user.interface";

interface PostInterface {
    id: number;
    title: string;
    excerpt: string;
    body: string;
    createdAt?: Date;
    updatedAt?: Date;
    userId: number;
    user?: UserInterface
}

export default PostInterface;
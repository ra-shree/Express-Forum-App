import Service from "@/utils/interfaces/services.interface";
import PostInterface from "@/resources/post/post.interface";
import PostModel from "@/resources/post/post.model";

class PostService implements Service<PostInterface> {
    index(): Promise<PostInterface[]> {
        throw new Error("Method not implemented.");
    }

    create(item: PostInterface): Promise<PostInterface> {
        throw new Error("Method not implemented.");
    }

    update(key: number, item: PostInterface): Promise<PostInterface> {
        throw new Error("Method not implemented.");
    }

    delete(key: number): Promise<boolean> {
        throw new Error("Method not implemented.");
    }

    show(key: number): Promise<PostInterface> {
        throw new Error("Method not implemented.");
    }
}

export default PostService;
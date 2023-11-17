import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "@/resources/user/user.model";

@Entity({ name: 'posts' })
class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    excerpt: string

    @Column({
        type: 'text'
    })
    body: string

    @CreateDateColumn({
        name: 'created_at'
    })
    createdAt: Date
    
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date
    
    @ManyToOne(() => User, (user) => user.posts)
    user: User
}

export default Post;
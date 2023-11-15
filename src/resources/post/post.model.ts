import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import User from "@/resources/user/user.model";

@Entity()
class Post extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    excerpt: string

    @Column()
    body: string

    @CreateDateColumn({
        name: 'created_at',
        type: 'timestamp',
    })
    createdAt: string
    
    @UpdateDateColumn({
        name: 'updated_at',
        type: 'timestamp',
    })
    updatedAt: string
    
    @ManyToOne(() => User, (user) => user.posts)
    user: User
}

export default Post;
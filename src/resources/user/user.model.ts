import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import Post from "@/resources/post/post.model";

@Entity({ name: 'users' })
class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        length: 100,
    })
    name: string

    @Column({
        unique: true,
    })
    email: string

    @Column({
        length: 100,
    })
    password: string

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

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[] 
}

export default User;
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
        name: 'created_at'
    })
    createdAt: Date
    
    @UpdateDateColumn({
        name: 'updated_at'
    })
    updatedAt: Date

    @OneToMany(() => Post, (post) => post.user)
    posts: Post[] 


    static findByEmail(email: string) {
        return this.createQueryBuilder('users')
            .where('users.email = :email', { email })
            .getOne();
    }
}

export default User;
import { hash } from "bcrypt";
import { ObjectId } from "mongodb";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, BeforeInsert, Column, Entity, ObjectIdColumn } from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {

    @ObjectIdColumn()
    _id: ObjectId

    @Field(() => String, {nullable: false})
    @Column({type: "string", nullable: false, unique: true})
    email: string;

    @Field(() => String, {nullable: false})
    @Column({type: "string", nullable: false})
    displayName: string;

    @Column({type: "string", nullable: false})
    password: string;

    @BeforeInsert()
    async beforeInsert() {
        this.password = await hash(this.password, 10);
    }
}
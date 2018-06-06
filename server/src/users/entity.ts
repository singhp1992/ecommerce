import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from "class-transformer";
import { IsEmail, IsString } from 'class-validator'
import * as bcrypt from 'bcrypt'


@Entity()
export default class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', { nullable: true })
    firstName: string

    @IsString()
    @Column('text', { nullable: true })
    lastName: string

    @IsEmail()
    @Column('text', { nullable: false })
    email: string

    @IsString()
    @Column('text', { nullable: false })
    @Exclude({ toPlainOnly: true })
    password: string

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
    }

    checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
    }

    @Column('boolean', { default: false, nullable: true })
    permission: boolean
}

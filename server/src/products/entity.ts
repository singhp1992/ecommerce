import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString } from 'class-validator'


@Entity()
export default class Product extends BaseEntity {

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @Column('text', { nullable: true })
    name: string

    @Column('text', { nullable: true })
    price: number 

    @IsString()
    @Column('text', { nullable: true })
    description: string

    @IsString()
    @Column('text', { nullable: true })
    image: string  
}


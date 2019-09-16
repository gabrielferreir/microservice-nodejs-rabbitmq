import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Product {

    constructor(id, name, price, qtd) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.qtd = qtd;
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    price: number;

    @Column()
    qtd: number;

}
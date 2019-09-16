import {Entity, PrimaryGeneratedColumn, Column} from "typeorm";

@Entity()
export class Request {

    constructor(id, consumerName, idProduct) {
        this.id = id;
        this.consumerName = consumerName;
        this.idProduct = idProduct;
    }


    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    consumerName: string;

    @Column()
    idProduct: number;

}
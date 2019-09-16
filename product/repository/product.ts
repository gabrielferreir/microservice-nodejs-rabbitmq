import {getManager} from "typeorm";
import {Product} from "../entity/Product";

export default class ProductRepository {

    async create(user: Product): Promise<Product> {
        return await getManager().getRepository(Product).save(user);
    }

    async read(): Promise<Array<Product>> {
        return await getManager().getRepository(Product).find();
    }

    async readOne(id: any): Promise<Array<Product>> {
        return await getManager().getRepository(Product).findByIds(id);
    }

    async updade(product: Product) {
        return await getManager().getRepository(Product).save(product);
    }

    async removeStore(idProduct: number) {
        const product = await getManager().getRepository(Product).findOne({id: idProduct});
        product.qtd = product.qtd - 1;
        return await getManager().getRepository(Product).save(product);
    }

    async delete(id: any) {
        return await getManager().getRepository(Product).delete(id);
    }
}
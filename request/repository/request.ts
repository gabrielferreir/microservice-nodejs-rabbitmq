import {getManager} from "typeorm";
import {Request} from "../entity/Request";

export default class ProductRepository {

    async create(user: Request): Promise<Request> {
        return await getManager().getRepository(Request).save(user);
    }

    async read(): Promise<Array<Request>> {
        return await getManager().getRepository(Request).find();
    }

    async readOne(id: any): Promise<Array<Request>> {
        return await getManager().getRepository(Request).findByIds(id);
    }

    async updade(user: Request) {
        return await getManager().getRepository(Request).save(user);
    }

    async delete(id: any) {
        return await getManager().getRepository(Request).delete(id);
    }
}
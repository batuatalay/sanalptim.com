import { Model } from "mongoose";

export class ResourceService <T extends any, C extends any, U extends any> {

    constructor(protected readonly mongoModel : Model<T>){}

    async create (model : C) : Promise <any> {
        const created = new this.mongoModel(model);
        return created.save();
    }

    async findAll() : Promise <T[]> {
        return await this.mongoModel.find().exec();
    }

    async find(id : string) : Promise <T> {
        try {
            return await (await this.mongoModel.findById(id)).toObject();
        } catch (error) {
            return error;
        }
    }

    async delete (id : string) {
        return await this.mongoModel.findOneAndDelete({_id : id}).exec();
    }

    async update (id : string , dto: U) : Promise<T> {
        let newModel = this.mongoModel.findOne({_id : id}).exec();
        if (newModel) {
            Object.assign(newModel, dto);
            return await this.mongoModel.findByIdAndUpdate(id, newModel, {new : true}).exec();
        }
    }
}

const { ObjectId } = require('mongodb');
class ProductService {
    constructor(client) {
        // get collection product
        this.Product = client.db().collection('products');
    }
    // Định nghĩa các phương thức truy xuất CSDL sử dụng mongodb API
    extractProductData(payload) {
        const product = {
            name: payload.name,
            price: payload.price,
        };
        // Remove undefined fields
        Object.keys(product).forEach((key) => product[key] === undefined && delete product[key]);
        return product;
    }
    // create and save product
    async create(payload) {
        const product = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(
            product,
            { $set: {} },
            { returnDocument: 'after', upsert: true },
        );
        return result.value;
    }

    async find(filter) {
        const cursor = await this.Product.find(filter);
        return await cursor.toArray();
    }
    // find product by name
    async findByName(name) {
        return await this.find({
            name: { $regex: new RegExp(name), $options: 'i' },
        });
    }
    // find product by id
    async findById(id) {
        return await this.Product.findOne({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
    }
    //update product
    async update(id, payload) {
        const filter = {
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        };
        const update = this.extractProductData(payload);
        const result = await this.Product.findOneAndUpdate(filter, { $set: update }, { returnDocument: 'after' });
        return result.value;
    }
    //delete product
    async delete(id) {
        const result = await this.Product.findOneAndDelete({
            _id: ObjectId.isValid(id) ? new ObjectId(id) : null,
        });
        return result.value;
    }
    // find favorite
    async findFavorite() {
        return await this.find({ favorite: true });
    }
    // delete all product
    async deleteAll() {
        const result = await this.Product.deleteMany({});
        return result.deletedCount;
    }
}

module.exports = ProductService;

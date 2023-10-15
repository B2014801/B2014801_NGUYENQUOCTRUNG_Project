import { createApiClient } from './api.service';
class PetShopService {
    constructor(baseUrl = '/api/petshop') {
        this.api = createApiClient(baseUrl);
        this.apiWithAuthToken = createApiClient(baseUrl, true);
    }
    async getAllProduct() {
        return (await this.api.get('/product')).data;
    }

    async findProductById(id) {
        return (await this.api.get(`/product/${id}`)).data;
    }
    async createUser(data) {
        return (await this.api.post('/auth/register', data)).data;
    }
    async login(data) {
        return (await this.api.post('/auth/login', data)).data;
    }
    async getImg(name) {
        return (await this.api.get(`/product/img/${name}`)).data;
    }
    async findByName(name) {
        return (await this.api.get(`/product/?name=${name}`)).data;
    }

    async addToCart(id, data) {
        return (await this.apiWithAuthToken.post(`/product/${id}`, data)).data;
    }
}

export default new PetShopService();

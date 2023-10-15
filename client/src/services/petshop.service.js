import createApiClient from './api.service';
class PetShopService {
    constructor(baseUrl = 'api/petshop') {
        this.api = createApiClient(baseUrl);
    }
    async getAllProduct() {
        return (await this.api.get('/product')).data;
    }
}
export default new PetShopService();

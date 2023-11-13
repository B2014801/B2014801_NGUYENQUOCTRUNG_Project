import { createApiClient } from './api.service';
class UserService {
    constructor(baseUrl = '/api/petshop/user') {
        this.api = createApiClient(baseUrl, true);
        this.ggauth = createApiClient('/api/petshop/auth/google/', false);
    }
    async getUser(id) {
        return (await this.api.get(`/${id}`)).data;
    }
    async update(data) {
        return await this.api.put('/update', data);
    }
    async loginWithGG(data) {
        return (await this.ggauth.post('/', data)).data;
    }
}
export default new UserService();

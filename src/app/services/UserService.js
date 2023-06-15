import { localApi } from "../interceptors";

const url = "/users";

const UserService = {};

UserService.signup = async (data) => localApi.post(`${url}/` , data);
UserService.login = async (data) => localApi.post(`${url}/login` , data);

UserService.create = async (data) => localApi.post(`${url}/` , data);

UserService.get = async (payload) => {
    const {currentPage , token } = payload;
    console.log(token)
    return localApi.get(`${url}?page=${currentPage}`, { headers: { Authorization: `Bearer ${token}` } });
}

UserService.update = async (id , data, token) => {
    return localApi.patch(`${url}/${id}`, data, {
      headers: { Authorization: `Bearer ${token}` },
    });
};

UserService.delete = async (data) => {
    const { id , token } = data;
    return localApi.delete(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};

UserService.getUserById = async (data) => {
    const { id , token } = data;
    return localApi.get(`${url}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
};

export default UserService;

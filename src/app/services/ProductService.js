import { api } from "../interceptors";

const url = "/products";

const ProductService = {};

ProductService.get = async (limit) => api.get(`${url}?limit=${limit}`);
ProductService.pagination = async (skip, itemsPerPage) =>
  api.get(`${url}?skip=${skip}&limit=${itemsPerPage}`);

export default ProductService;

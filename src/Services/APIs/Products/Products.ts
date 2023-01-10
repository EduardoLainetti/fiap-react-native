import IManageFavorites from "../../../Interfaces/IManageFavorites";
import api from "../Common/api";
import qs from "qs";

type IParamGetProducts = {
    page?: number;
    perPage: number;
    orderBy?: string;
    orderDirection?: string;
    search?: string;
};

const getAllProducts = (params: IParamGetProducts, token: string) => api.get("/storeProducts", { params, headers: { 'Authorization': `Bearer ${token}` } });  

const getFavoritesProducts = (token: string) => api.get("/storeProducts/getFavProducts", {headers: { 'Authorization': `Bearer ${token}`}});

const getProductDetails = (id: string, token: string) => api.get(`/storeProducts/product/${id}`, {headers: { 'Authorization': `Bearer ${token}` }});

const manageProductFavorite = (url: string, data: string, token: string) => api.post(url + "/storeProducts/manageFavorite", data, {headers: { 'Authorization': `Bearer ${token}` }});

export {
    getAllProducts,
    getFavoritesProducts,
    getProductDetails,
    manageProductFavorite,
    IParamGetProducts
};

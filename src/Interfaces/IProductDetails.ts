export interface IProductStore {
    _id: string;
    name: string;
    address: string;
    latitude: string;
    longitude: string;
}

export interface IProductDetails {
    _id: string;
    name: string;
    price: string;
    favorite: boolean;
    stores: Array<IProductStore>;
    createdDate: string;
    updatedDate: string;
}


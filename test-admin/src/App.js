import * as React from "react";
import {Admin, Resource} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserCreate, UserEdit, UserList} from "./components/users";
import {ProductCreate, ProductEdit, ProductList} from "./components/products";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
import authProvider from "./components/auth";

const convertFileToBase64 = file =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;

        reader.readAsDataURL(file.rawFile);
    });

const dataProvider = jsonServerProvider('http://localhost:8080');
const imageDataProvider = {
    ...dataProvider,
    create: async (resource, params) => {
        if (resource !== 'products' || !params.data.image) {
            return dataProvider.update(resource, params);
        }
        const base64Picture = await convertFileToBase64(params.data.image);
        return await dataProvider.create(resource, {
            ...params,
            data: {
                ...params.data,
                image: base64Picture
                ,
            },
        });
    },
    update: async (resource, params) => {
        if (resource !== 'products' || !params.data.image) {
            return dataProvider.update(resource, params);
        }
        const base64Picture = await convertFileToBase64(params.data.image);
        return await dataProvider.update(resource, {
            ...params,
            data: {
                ...params.data,
                image: base64Picture
                ,
            },
        });
    },
};
const App = () => (

    <Admin dataProvider={imageDataProvider} authProvider={authProvider}>
        <Resource name="products" create={ProductCreate} list={ProductList} edit={ProductEdit} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} create={UserCreate} edit={UserEdit} />
    </Admin>
);

export default App;

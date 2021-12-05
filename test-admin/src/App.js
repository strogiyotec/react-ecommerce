import * as React from "react";
import {Admin, Resource, EditGuesser} from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import {UserCreate, UserEdit, UserList} from "./components/users";
import {PostCreate, PostEdit, PostList} from "./components/posts";
import PostIcon from '@material-ui/icons/Book';
import UserIcon from '@material-ui/icons/Group';
const dataProvider = jsonServerProvider('http://localhost:8080');
const App = () => (

    <Admin dataProvider={dataProvider} >
        <Resource name="posts" list={PostList} edit={
            PostEdit
        } create={PostCreate} icon={PostIcon} />
        <Resource name="users" list={UserList} icon={UserIcon} create={UserCreate} edit={UserEdit} />
    </Admin>
);

export default App;

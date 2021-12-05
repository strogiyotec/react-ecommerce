import * as React from "react";
import {
    List,
    Datagrid,
    TextField,
    EmailField,
    UrlField,
    Create,
    BooleanField,
    BooleanInput,
    TextInput,
    Edit,
    SimpleForm,
    useNotify,
    useRedirect,
    useRefresh
} from 'react-admin';


const UserTitle = ({record}) => {
    return <span>User {record ? `"${record.name}"` : ''}</span>;
};
export const UserList = props => (
    <List {...props}>
        <Datagrid rowClick="edit">
            <TextField source="id" />
            <TextField source="name" />
            <BooleanField source="isAdmin" />
            <EmailField source="email" />
        </Datagrid>
    </List>
);

export const UserCreate = props => {
    const notify = useNotify();
    const refresh = useRefresh();
    const redirect = useRedirect();

    const onSuccess = () => {
        notify('User was created');
        redirect("/users")
    };

    const onFailure = (error) => {
        notify(`Could not create user: ${error.body.messages}`);
        redirect("/users")
    };

    return (
        <Create onSuccess={onSuccess} onFailure={onFailure} {...props}>
            <SimpleForm >
                <TextInput type="email" source="email" />
                <TextInput type="password" source="password" />
                <TextInput source="name" />
                <BooleanInput source="isAdmin" />
            </SimpleForm>
        </Create>
    );
};

export const UserEdit = props => (
    <Edit title={<UserTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput type="email" source="email" />
            <TextInput source="name" />
        </SimpleForm>
    </Edit>
);

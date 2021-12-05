import * as React from "react";
import {makeStyles} from '@material-ui/core/styles';
import {
    List,
    Datagrid,
    TextField,
    ReferenceField,
    EditButton,
    Edit,
    SimpleForm,
    ReferenceInput,
    SelectInput,
    TextInput,
    Create,
    ImageField,
    ImageInput
} from 'react-admin';
const useImageFieldStyles = makeStyles(theme => ({
    image: {
        width: 50,
        height: 50,
    }
}));

export const ProductList = props => (
    <List {...props}>
        <Datagrid >
            <TextField source="id" />
            <TextField source="name" />
            <ImageField classes={useImageFieldStyles} title="Image" source="image" />
            <TextField source="brand" />
            <TextField source="category" />
            <TextField source="description" />
            <TextField source="price" />
            <TextField source="countInStock" />
            <TextField source="rating" />
            <EditButton />
        </Datagrid>
    </List>
);

const ProductTitle = ({record}) => {
    return <span>Product {record ? `"${record.name}"` : ''}</span>;
};

export const ProductEdit = props => (
    <Edit title={<ProductTitle />} {...props}>
        <SimpleForm>
            <TextInput disabled source="id" />
            <TextInput source="name" />
            <TextInput source="price" type="number" />
            <ImageInput source="image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="countInStock" type="number" />
            <TextInput source="rating" type="number" />
            <TextInput source="category" />
            <TextInput source="brand" />
            <TextInput multiline source="description" />
        </SimpleForm>
    </Edit>
);
export const ProductCreate = props => (
    <Create {...props}>
        <SimpleForm>
            <TextInput source="name" />
            <TextInput source="price" type="number" />
            <ImageInput source="image" accept="image/*">
                <ImageField source="src" title="title" />
            </ImageInput>
            <TextInput source="countInStock" type="number" />
            <TextInput source="rating" type="number" />
            <TextInput source="category" />
            <TextInput source="brand" />
            <TextInput multiline source="description" />
        </SimpleForm>
    </Create>
);

import React, {useEffect, useState} from "react";
import axios from "axios";
import Product from "../components/Product";
import data from "../data";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";

export default function HomeScreen() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                axios.defaults.baseURL = 'http://localhost:8080';
                const json = await axios.get("/products");
                console.log(json.data)
                setLoading(false);
                setProducts(json.data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {products.map((product) => (
                        <Product key={product.id} product={product}></Product>
                    ))}
                </div>
            )}
        </div>
    );
}

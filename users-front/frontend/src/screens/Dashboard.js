import React, {useEffect, useState} from "react";
import axios from "axios";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import '../App.css';

export default function Dashboard() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const userId = sessionStorage.getItem("user")
                axios.defaults.baseURL = 'http://localhost:8080';
                const json = await axios.get(`/users/${userId}/orders`);
                console.log(json.data)
                setLoading(false);
                setOrders(json.data);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div>
            <header className="primary">Your orders</header>
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MessageBox variant="danger">{error}</MessageBox>
            ) : (
                <div className="row center">
                    {orders.map((order) => (
                        <Product key={order.id} product={order}></Product>
                    ))}
                </div>
            )}
        </div>
    );
}

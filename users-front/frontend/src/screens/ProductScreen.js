import React, {useEffect, useState} from "react";
import {Link, useParams, useNavigate} from "react-router-dom";
import axios from "axios";
import Rating from '../components/Rating'
import '../App.css';

export default function ProductScreen() {
    const {id} = useParams();
    const [product, setProduct] = useState({});
    let history = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            try {
                axios.defaults.baseURL = 'http://localhost:8080';
                const json = await axios.get(`/products/${id}`);
                console.log(json.data)
                setProduct(json.data);
            } catch (err) {
                console.log("Bad")
            }
        };
        fetchData();
    }, []);
    const handleCreateOrder = () => {
        let userId = sessionStorage.getItem("user")
        axios.post(
            `http://localhost:8080/users/${userId}/product/${product.id}`,
        ).then(response => {
            console.log(response.data)
            history("/")
        }).catch(error => {
            console.log(error)
            alert("All bad")
        });
    }
    return (
        <div>
            <Link to="/">Back to Result</Link>
            <div className="row">
                <div className="col-2">
                    <img className="photo" src={product.image} alt={product.name} />
                </div>
                <div className="col-1">
                    <ul>
                        <li>
                            <h1>{product.name}</h1>
                        </li>
                        <li>
                            <Rating
                                rating={product.rating}
                                numReviews={product.numReviews}
                            ></Rating>
                        </li>
                        <li>Pirce : ${product.price}</li>
                        <li>
                            Description:
                            <p>{product.description}</p>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <div className="row">
                                    <div>Price</div>
                                    <div className="price">${product.price}</div>
                                </div>
                            </li>
                            <li>
                                <div className="row">
                                    <div>Status</div>
                                    <div>
                                        {product.countInStock > 0 ? (
                                            <span className="success">In Stock</span>
                                        ) : (
                                            <span className="danger">Unavailable</span>
                                        )}
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <input type="button" className="primary block" value={'Order'}
                        onClick={handleCreateOrder} /><br />
                </div>
            </div>

        </div>
    );
}

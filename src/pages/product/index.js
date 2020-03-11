import React, { Fragment, useState, useEffect } from 'react'
import api from './../../services/api'
import { useParams } from 'react-router-dom';
import './style.css'


export default function Product() {

    const [product, setProduct] = useState({})
    const { id } = useParams();
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        const getProductById = async () => {
            setIsLoading(true);
            const { data } = await api.get(`/products/${id}`);

            setProduct(data)
            setIsLoading(false);
        }
        getProductById()

    }, [id])

    return (
        <Fragment>
            {isLoading ? (
                <div className="product-info">
                    Loading...
                </div>
            ) : (
                    <div className="product-info">
                        <h1>{product.title}</h1>
                        <p>{product.description}</p>
                        <p>
                            URL: <a href={product.description}>{product.url}</a>
                        </p>
                    </div>
                )}
        </Fragment>

    )
}
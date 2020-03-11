import React, { Fragment, useState, useEffect } from 'react'
import api from './../../services/api'
import { Link } from 'react-router-dom'

import './styles.scss'

export default function Main() {
    const [products, setProducts] = useState([])
    const [productInfo, setProductInfo] = useState({})
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const getProducts = async () => {
            setIsLoading(true);
            setIsError(false)

            try {
                const { data } = await api.get(`/products?page=${page}`);
                const { docs, ...productInfo } = data

                setProducts(docs)
                setProductInfo(productInfo)

            } catch (error) {
                setIsError(true)
            } finally {
                setIsLoading(false);
            }
        }
        getProducts()

    }, [page])

    const nextPage = () => {
        if (page === productInfo.pages) return
        const pageNumber = page + 1
        setPage(pageNumber)
    }

    const prevPage = () => {
        if (page === 1) return
        const pageNumber = page - 1
        setPage(pageNumber)
    }


    return (
        <Fragment>
            {isError ? (
                <div className="product-list">
                    <div>Erro ao listar os produtos...</div>
                </div>
            ) : (
                    isLoading ? (
                        <div className="product-list">
                            <div>Loading...</div>
                        </div>

                    ) : (
                            <div className="product-list">
                                {products.map(product => (
                                    <article key={product._id}>

                                        <strong>{product.title}</strong>
                                        <p>{product.description}</p>

                                        <Link to={`/products/${product._id}`}>Acessar</Link>
                                    </article>
                                ))}
                                <div className="actions">
                                    <button disabled={page === 1} onClick={prevPage}>Anterior</button>
                                    <button disabled={page === productInfo.pages} onClick={nextPage}>Próximo</button>
                                </div>
                            </div>
                        )
                )}

        </Fragment>
    )
}
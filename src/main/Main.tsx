import React, {useEffect, useState} from 'react';
import {Product} from "../interfaces/product";

const Main = () => {
    const [products, setProducts] = useState([] as Product[]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://ec2-13-53-40-213.eu-north-1.compute.amazonaws.com:8001/api/products');

                const data = await response.json();

                setProducts(data);
            }
        )();
    }, []);

    const subs = async (id: number) => {
        await fetch(`http://ec2-13-53-40-213.eu-north-1.compute.amazonaws.com:8001/api/products/${id}/subs`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });

        setProducts(products.map(
            (p: Product) => {
                if (p.id === id) {
                    p.subs++;
                }

                return p;
            }
        ));
    }

    return (
        <main role="main">
            <div className="album py-5 bg-light">
                <div className="container">
                    <div className="row">
                        {products.map(
                            (p: Product) => {
                                return (
                                    <div className="col-md-4" key={p.id}>
                                        <div className="card mb-4 shadow-sm">
                                            <img src={p.image} height="180"/>
                                            <div className="card-body">
                                                <p className="card-text">{p.title}</p>
                                                <div className="d-flex justify-content-between align-items-center">
                                                    <div className="btn-group">
                                                        <button type="button"
                                                                className="btn btn-sm btn-outline-secondary"
                                                                onClick={() => (p.id)}
                                                        >
                                                            Subscribe
                                                        </button>
                                                    </div>
                                                    <small className="text-muted">{p.subs} subs</small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </div>
                </div>
            </div>

        </main>
    );
};

export default Main;

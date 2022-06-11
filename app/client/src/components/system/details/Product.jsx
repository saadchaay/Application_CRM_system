import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "../../../api/axios";


export default function Product() {
    const [product, setProduct] = useState(null);
    const [error, setError] = useState(null);
    const { id } = useParams();

    const fetchProduct = async () => {
        const res = await axios.get(`ProductsController/show/${id}`);
        if(res.data.success) {
            setProduct(res.data);
            console.log(res.data);
        } else {
            setError(res);
            console.log(res);
        }
    }

    useEffect(() => {
        fetchProduct();
    })

    return(
        <div>
            {product.title}
        </div>
    );
};
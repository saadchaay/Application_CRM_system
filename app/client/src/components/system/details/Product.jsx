import { useState } from "react";
import { useParams } from "react-router-dom";


export default function Product() {
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const { id } = useParams();
    
    return(
        <div>
            {id}
        </div>
    );
};
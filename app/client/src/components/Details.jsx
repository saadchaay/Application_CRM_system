import { useState, useEffect } from "react";
import axios from "../api/axios";

const Details = (props) => {
    const [admin, setAdmin] = useState([]);
    const getAdmin = async (id) => {
        const res = await axios.get(`auth/AdminController/getAdmin/${id}`);
        if(res.status === 200) {
            console.log(res.data);
            setAdmin(res.data);
        }
    }

    useEffect(() => {
        getAdmin(props.match.params.id);
    }, [props.match.params.id]);

    return (
        <div>
            {admin.name}
        </div>
    );
}

export default Details;
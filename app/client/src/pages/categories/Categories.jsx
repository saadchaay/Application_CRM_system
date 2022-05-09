import CardCategory from "../../components/cardCategory/CardCategory" ;
import { useState } from "react";
import { category } from "../../properties";

export default function Categories() {
    const [data, setData] = useState([]);
    const listCategory = category.map((item, index) => {
        <CardCategory key={index+1} data={item} />;
    });
    return (

        <div className="container">
            <div className="row">
                {listCategory}
                {/* <CardCategory data={data[0]} />
                
                { listCategory } */}
            </div>
        </div>
    )
}

import CardCategory from "../../components/cardCategory/CardCategory" ;
import { useState } from "react";
import { categories } from "../../properties";

function CardCate(props) {
    return <li>{props.value}</li>;
}
export default function Categories() {
    const [data, setData] = useState([]);
    // const listCategory = category.map((item, index) => {
    //     <CardCategory key={index} data={item} />;
    // });
    // const numbers = [
    //     {
    //         id: 1,
    //         name: "Category 1", 
    //     },
    //     {
    //         id: 2,
    //         name: "Category 2",
    //     },
    // ];
  const listItems = categories.map((category) =>
    // Correct! Key should be specified inside the array.
    <CardCate key={category.id.toString()} value={category.description} />
  );
  return (
    <ul>
      {listItems}
    </ul>
  );
    }
    
    const posts = [
      {id: 1, title: 'Hello World', content: 'Welcome to learning React!'},
      {id: 2, title: 'Installation', content: 'You can install React from npm.'}
    ];
    
    // return (

    //     <div className="container">
    //         <div className="row">
    //             {category.map((item, index) => {
    //                 <CardCategory key={index} data={item} />;
    //             }
    //             )}
    //         </div>
    //     </div>
    // )
// }

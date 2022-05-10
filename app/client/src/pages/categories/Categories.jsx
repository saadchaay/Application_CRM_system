import CardCategory from "../../components/cardCategory/CardCategory" ;
import { useState } from "react";
import { categories } from "../../properties";

function CardCate(props) {
    return <li>{props.value.name}
                <ul>
                    <li>
                    {props.value.description}
                    </li>
                    <li>
                    {props.value.image}
                    </li>
                </ul>
            </li>;
}
export default function Categories() {
    const [data, setData] = useState([]);
    const listCategory = categories.map((category) => {
        <CardCategory key={category.id.toString()} value={category} />;
    });
  const listItems = categories.map((category) =>
    // Correct! Key should be specified inside the array.
    <CardCate key={category.id.toString()} value={category} />
  );
  return (
    <ul>
      {listCategory}
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

<?php

    class ProductsController extends Controller {

        private $product ;
        private $category ;
        private $property ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->product = new Product();
            $this->category = new Category();
            $this->property = new Property();
        }

        public function index($id, $type)
        {
            
                $data = [
                    'id' => $id,
                    'type' => $type,
                ];
            
            $all_products = $this->product->get_all_product($data);
            $categories = $this->category->get_all_category($data);
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_products){
                    http_response_code(201);
                    echo json_encode(array(
                        'status' => 'success',
                        'data' => $all_products,
                        'categories' => $categories,
                        'properties' => array(
                            'colors' => $this->property->get_colors(),
                            'sizes' => $this->property->get_sizes(),
                        )
                    ));
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No products found'));
                }
            }
        }

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] === "POST"){
                $data = [
                    'id_creator' => $dataJSON->creator ? $dataJSON->creator : "",
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                    'category' => $dataJSON->category ? (int)($dataJSON->category) : null,
                    'title' => $dataJSON->title ? $dataJSON->title : "",
                    'description' => $dataJSON->description ? $dataJSON->description : "",
                    'quantity' => $dataJSON->quantity ? (int)$dataJSON->quantity : 0,
                    'price' => $dataJSON->price ? (double)$dataJSON->price : 0.00,
                    'avatar' => $dataJSON->avatar ? $dataJSON->avatar : "",
                    'properties' => array_merge($dataJSON->colors, $dataJSON->sizes),
                ];
                // print_r($dataJSON);
                // echo json_encode($data);
                $product = $this->product->create_product($data);
                if($product){
                    $last_product = $this->product->last_insertion($data);
                    echo json_encode(array(
                        'status' => 'success',
                        'data' => $last_product,
                    ));
                    // $property = array()
                    // foreach($data['properties']['color'] as $color){
                    //     $property = $this->property->create_property();
                    //     $property ? $success = true : $success = false;
                    // }
                    // if($success){
                    //     http_response_code(201);
                    //     echo json_encode(array(
                    //         'status' => 'success',
                    //         'message' => 'Product created',
                    //         'data' => $product,
                    //     ));
                    // }
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'Product not created'));
                }
            }
        }

        public function changeStatus($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "PUT") {
                $product = $this->product->get_product($id);
                print_r($product);
                if($product){
                    $data = [
                        'id' => $id,
                        'status' => $product->status ? false : true,
                    ];
                    $product = $this->product->change_status($data);
                    if($product){
                        http_response_code(201);
                        echo json_encode(array('message' => 'Product status changed'));
                    }else{
                        http_response_code(404);
                        echo json_encode(array('message' => 'Product status not changed'));
                    }
                }
            }
        }
        
        
    }
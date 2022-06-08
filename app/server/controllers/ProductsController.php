<?php

    class ProductsController extends Controller {

        private $product ;
        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->product = new Product();
            $this->category = new Category();
        }

        public function index($id, $type)
        {
            
                $data = [
                    'id' => $id,
                    'type' => $type,
                ];
            
            $all_products = $this->product->get_all_product($data);
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                print_r($all_products[0]->title);
                if($all_products){
                    http_response_code(201);
                    echo json_encode($all_products);
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
                    'id_creator' => $dataJSON->id_creator ? $dataJSON->id_creator : "",
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                    'category' => $dataJSON->category ? $dataJSON->category : "",
                    'title' => $dataJSON->title ? $dataJSON->title : "",
                    'description' => $dataJSON->description ? $dataJSON->description : "",
                    'quantity' => $dataJSON->quantity ? $dataJSON->quantity : 0,
                    'status' => $dataJSON->status ? $dataJSON->status : true,
                    'price' => $dataJSON->price ? $dataJSON->price : 0.00,
                    'avatar' => $dataJSON->avatar ? $dataJSON->avatar : "",
                ];

                $product = $this->product->create_product($data);
                if($product){
                    http_response_code(201);
                    echo json_encode(array('message' => 'Product created'));
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
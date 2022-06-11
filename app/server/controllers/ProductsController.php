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
                    'quantity' => $dataJSON->quantity ? $dataJSON->quantity : 0,
                    'price' => $dataJSON->price ? $dataJSON->price : 0.00,
                    'avatar' => $dataJSON->avatar ? $dataJSON->avatar : "",
                    'properties' => array_merge($dataJSON->color ? $dataJSON->color:[], $dataJSON->size ? $dataJSON->size:[]),
                ];
                $errors = $this->validation($data, $this->validate_regex);
                if($errors) {
                    http_response_code(200);
                    echo json_encode($errors);
                } else {
                    $data['price'] = (double)$data['price'];
                    $data['quantity'] = (int)$data['quantity'];
                    $product = $this->product->create_product($data);
                    if($product){
                        $last_product = $this->product->last_insertion($data);
                        $success =false ;
                        if(!empty($data["properties"])){
                            foreach($data["properties"] as $property){
                                $this->property->create_property($last_product->id, $property->id);
                                $success = true ;
                            }
                        }
                        if($success){
                            http_response_code(201);
                            echo json_encode(array(
                                'status' => 'success',
                                'message' => 'Product created',
                                'data' => $product,
                            ));
                        }
                    }else{
                        http_response_code(404);
                        echo json_encode(array('message' => 'Product not created'));
                    }
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
        
        public function show($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "GET") {
                $product = $this->product->get_product($id);
                // print_r($product);
                $data = [
                    'id' => $product->id_admin,
                    'type' => $product->type_creator
                ];
                if($product){
                    http_response_code(201);
                    echo json_encode(array(
                        'status' => 'success',
                        'data' => $product,
                        'categories' => $this->category->get_all_category($data),
                        'properties' => array(
                            'data' => $this->property->get_properties($id),
                            'colors' => $this->property->get_colors(),
                            'sizes' => $this->property->get_sizes(),
                        )
                    ));
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No product found'));
                }
            }
        }

        public function update($id)
        {
            $dataJSON = json_decode(file_get_contents("php://input"));
            if($_SERVER["REQUEST_METHOD"] === "PUT"){
                $product = $this->product->get_product($id);
                if($product){
                    $data = [
                        'id' => $id,
                        'id_creator' => $dataJSON->creator ? $dataJSON->creator : "",
                        'type' => $dataJSON->type ? $dataJSON->type : "",
                        'category' => $dataJSON->category ? (int)($dataJSON->category) : null,
                        'title' => $dataJSON->title ? $dataJSON->title : "",
                        'description' => $dataJSON->description ? $dataJSON->description : "",
                        'quantity' => $dataJSON->quantity ? $dataJSON->quantity : 0,
                        'price' => $dataJSON->price ? $dataJSON->price : 0.00,
                        'avatar' => $dataJSON->avatar ? $dataJSON->avatar : "",
                        'properties' => array_merge($dataJSON->color ? $dataJSON->color:[], $dataJSON->size ? $dataJSON->size:[]),
                    ];
                    $errors = $this->validation($data, $this->validate_regex);
                    if($errors) {
                        http_response_code(200);
                        echo json_encode($errors);
                    } else {
                        $data['price'] = (double)$data['price'];
                        $data['quantity'] = (int)$data['quantity'];
                        $product = $this->product->update_product($data);
                        if($product){
                            $success =false ;
                            if(!empty($data["properties"])){
                                $this->property->delete_properties($id);
                                foreach($data["properties"] as $property){
                                    $this->property->update_property($id, $property->id);
                                    $success = true ;
                                }
                            }
                            if($success){
                                http_response_code(201);
                                echo json_encode(array(
                                    'status' => 'success',
                                    'message' => 'Product updated',
                                    'data' => $product,
                                ));
                            }
                        }else{
                            http_response_code(404);
                            echo json_encode(array('message' => 'Product not updated'));
                        }
                    }
                }
            }
        }
        
    }
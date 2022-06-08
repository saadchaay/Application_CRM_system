<?php

    class CategoriesController extends Controller {

        private $product ;
        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->product = new Product();
        }

        public function index($id, $type)
        {
            
                $data = [
                    'id' => $id,
                    'type' => $type,
                ];
            
            $all_products = $this->product->get_all_product($data);
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_products){
                    http_response_code(201);
                    echo json_encode($all_products);
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No products found'));
                }
            }
        }
        
    }
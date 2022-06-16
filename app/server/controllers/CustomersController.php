<?php

    class CustomersController extends Controller {

        private $customer ;
        private $category ;
        private $property ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->customer = new Customer();
            $this->category = new Category();
            $this->property = new Property();
        }

        public function index($id)
        {
            
            
            $all_customers = $this->customer->get_customers($id);
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_customers){
                    http_response_code(201);
                    echo json_encode(array(
                        'status' => 'success',
                        'data' => $all_customers,
                    ));
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No customers found'));
                }
            }
        }


        public function delete($id)
        {
            if($_SERVER["REQUEST_METHOD"] === "DELETE"){
                $customer = $this->customer->get_customer($id);
                if($customer){
                    $customer = $this->customer->delete($id);
                    if($customer){
                        http_response_code(201);
                        echo json_encode(array('message' => 'customer deleted'));
                    }else{
                        http_response_code(404);
                        echo json_encode(array('message' => 'customer not deleted'));
                    }
                }
            }
        }
        
    }
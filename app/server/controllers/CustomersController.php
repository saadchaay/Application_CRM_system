<?php

    class CustomersController extends Controller {

        private $customer ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->customer = new Customer();
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

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $data = [
                    'id' => $dataJSON->id_admin ? $dataJSON->id_admin : "",
                    'name' => $dataJSON->name ? $dataJSON->name : "",
                    'phone' => $dataJSON->phone ? $dataJSON->phone : "",
                    'address' => $dataJSON->address ? $dataJSON->address : "",
                    'city' => $dataJSON->city ? $dataJSON->city : "",
                ];

                $customer = $this->customer->create($data);
                if($customer){
                    http_response_code(201);
                    echo json_encode(array("message" => "Customer created"));
                } else {
                    http_response_code(500);
                    echo json_encode(array("errors" => "Customer not created"));
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
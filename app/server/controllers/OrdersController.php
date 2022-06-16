<?php

    class OrdersController extends Controller {

        private $order ;
        private $customer ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->order = new Order();
            $this->customer = new Customer();
        }

        public function index($id)
        {   
            $all_orders = $this->order->get_all_orders($id);

            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_orders){
                    http_response_code(201);
                    echo json_encode(array(
                        'orders' => $all_orders,
                        'customers' => $this->customer->get_customers($id),
                    ));
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No orders found'));
                }
            }
        }

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));
            if($_SERVER["REQUEST_METHOD"] == "POST"){
                foreach($dataJSON->orders as $order){
                    $orderData = [
                        'id_customer' => $order->id_customer ? $order->id_customer : "",
                        'id_admin' => $order->id_admin ? $order->id_admin : "",
                        'date' => $order->date ? $order->date : "",
                        'total' => $order->total ? $order->total : "",
                    ];
                    $order = $this->order->create($orderData);
                    

                }
            }
        }

        public function delete($id)
        {
            if($_SERVER["REQUEST_METHOD"] === "DELETE"){
                echo json_encode(array("message" => "Order deleted"));
            }
        }
        
    }
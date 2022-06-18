<?php

class OverView extends Controller{
    
    private $order;
    
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        
        $this->order = new Order();
    }

    public function index($id)
    {
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            echo json_encode(array('overView' => $this->order->get_all_orders($id)));
        }
    }
}
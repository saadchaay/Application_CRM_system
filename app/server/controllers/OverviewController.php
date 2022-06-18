<?php

class OverviewController extends Controller{
    
    private $order;
    private $product;
    
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        
        $this->order = new Order();
        $this->product = new Product();
    }

    public function index($id)
    {
        $orders = $this->order->get_all_orders($id);
        $products = $this->product->get_all_product(array('id' => $id, 'type' => 'admin'));
        $total = 0;
        $prices = 0;
        $delivered = 0;
        $confirmed = 0;
        $returned = 0;
        foreach($orders as $order) {
            $total += $order->total;
        }
        foreach($products as $product) {
            $prices += $product->price;
        }

        foreach($orders as $order) {
            if($order->status == 'Confirmed') {
                $confirmed++;
            }
            if($order->tracking == 'Delivered') {
                $delivered++;
            }
            if($order->tracking == 'Returned' || $order->tracking == 'Refused') {
                $returned++;
            }
        }
        $data = [
            [
                'name' => "Total Revenu",
                'link' => "",
                'icon' => "AttachMoney",
                'value' => $total,
            ],
            [
                'name' => "Total Orders",
                'link' => "/orders",
                'icon' => "Store",
                'value' => count($orders)
            ],
            [
                'name' => "Total Profit",
                'link' => "",
                'icon' => "MonetizationOn",
                'value' => $total - $prices,
            ],
            [
                'name' => "Delivered Orders",
                'link' => "",
                'icon' => "LocalShipping",
                'value' => $delivered,
            ],
            [
                'name' => "Order In Progress",
                'link' => "",
                'icon' => "DonutLarge",
                'value' => $confirmed,
            ],
            [
                'name' => "Returned Orders",
                'link' => "",
                'icon' => "TrendingDown",
                'value' => $returned,
            ]
        ];
        // $obj = (Object) $data;
        $obj = [];
        foreach($data as $row) {
            array_push($obj, (Object) $row);
        }
        if($_SERVER["REQUEST_METHOD"] == "GET"){
            echo json_encode(array('todayOrders' => $this->order->today_order($id) , 'data' => $obj));
        }
    }
}
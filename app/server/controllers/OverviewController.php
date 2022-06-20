<?php

class OverviewController extends Controller{
    
    private $order;
    private $product;
    private $customer;
    
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        
        $this->order = new Order();
        $this->product = new Product();
        $this->customer = new Customer();
        $this->category = new Category();
        $this->user = new User();
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
                'value' => (int)($total + 1),
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
                'value' => (int)($total - $prices),
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

    public function analytics($id)
    {
        $orders = $this->order->get_all_orders($id);
        $products = $this->product->get_all_product(array('id' => $id, 'type' => 'admin'));
        $customers = $this->customer->get_customers($id);
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
                'name' => "Total Products",
                'link' => "",
                'icon' => "LocalGroceryStore",
                'value' => count($products),
            ],
            [
                'name' => "Total Orders",
                'link' => "/orders",
                'icon' => "Store",
                'value' => count($orders)
            ],
            [
                'name' => "Total Customers",
                'link' => "",
                'icon' => "People",
                'value' => count($customers),
            ],
            [
                'name' => "Total Users",
                'link' => "/orders",
                'icon' => "AccountCircle",
                'value' => count($this->user->get_all_users($id))
            ],
            [
                'name' => "Total Categories",
                'link' => "",
                'icon' => "Category",
                'value' => count($this->category->get_all_category($id)),
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
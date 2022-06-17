<?php

    class OrdersController extends Controller {

        private $order ;
        private $customer ;
        private $product ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->order = new Order();
            $this->customer = new Customer();
            $this->product = new Product();
        }

        public function index($id)
        {   
            $all_orders = $this->order->order_customer($id);

            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_orders){
                    http_response_code(201);
                    echo json_encode($all_orders);
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No orders found'));
                }
            }
        }

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));
            $is_success = 0;

            if($_SERVER["REQUEST_METHOD"] == "POST"){
                $admin = $dataJSON->admin ? $dataJSON->admin : "";
                $productErr = '';
                $orderErr = '';
                $countOr = count($dataJSON->order);
                foreach($dataJSON->orders as $order){
                    $customer_id = $this->customer->get_customer_id($order->customer);
                    // check if customer exist
                    if(!$customer_id){
                        if($this->customer->create(array(
                            'id' => $admin,
                            'name' => $order->customer,
                            'phone' => $order->phone,
                            'address' => $order->address,
                            'city' => $order->city,
                        ))){
                            $newCustomer = $this->customer->get_customer_id($order->customer);
                        }
                    }
                    $orderData = [
                        'reference' => $order->id ? $order->id : "",
                        'date_order' => $order->date ? $order->date : null,
                        'customer' => $customer_id->id ? $customer_id->id : $newCustomer->id,
                        'admin' => $admin,
                        'total' => $order->total ? $order->total : "",
                    ];
                    $statusCreation = $this->order->check_order_ref($orderData['reference']);
                    if(!$statusCreation){
                        if($this->order->create($orderData)){
                            // get product id 
                            $product_id = $this->product->get_product_id($order->sku);
                            if(!$product_id){
                                $productErr = 'Product not found';
                                break;
                            }
                            // create order_details
                            $detail_order = [
                                'order' => $this->order->get_last_insert_order($admin)->id, // get last insert order
                                'product' => $product_id->id, // get last insert product),
                                'quantity' => $order->quantity ? $order->quantity : "",
                            ];
                            if($this->order->create_detail($detail_order)){
                                $colors = explode(",", $order->colors);
                                $sizes = explode(",", $order->sizes);
                                $order_properties = [
                                    'order_detail' => $this->order->get_last_insert_order_detail()->id, // get last insert order
                                    'colors' => $colors,
                                    'sizes' => $sizes
                                ];
                                foreach($order_properties['colors'] as $color){
                                    $tmp = [
                                        'property' => "color",
                                        'value' => $color,
                                        'order_detail' => $order_properties['order_detail'],
                                    ];
                                    $this->order->create_order_properties($tmp);
                                }
                                foreach($order_properties['sizes'] as $size){
                                    $tmp = [
                                        'property' => "size",
                                        'value' => $size,
                                        'order_detail' => $order_properties['order_detail'],
                                    ];
                                    $this->order->create_order_properties($tmp);
                                }
                                $is_success += 1;
                            } else {
                                $this->order->delete($this->order->get_last_insert_order($admin)->id);
                            }
                        } else {
                            print_r("error");
                            $this->customer->delete($newCustomer->id);
                        }
                    } else {
                        $orderErr = 'Some Order already exist';
                    }
                    if($is_success){
                        http_response_code(201);
                        echo json_encode(array('message' => 'Orders Imported'));
                    }
                }
                if($is_success < $countOr && $is_success > 0){
                    http_response_code(200);
                    echo json_encode(array('productErr' => $productErr, 'orderErr' => $orderErr));
                }elseif($is_success == 0){
                    http_response_code(200);
                    echo json_encode(array('message' => 'No orders imported'));
                }
            }
        }

        public function delete($id)
        {
            if($_SERVER["REQUEST_METHOD"] === "DELETE"){
                echo json_encode(array("message" => "Order deleted"));
            }
        }

        public function count($ref)
        {
            print_r($this->order->check_order_ref($ref));
        }
        
    }
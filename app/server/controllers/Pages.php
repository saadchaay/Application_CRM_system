<?php

class Pages extends Controller{
    
    private $admin;
    
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        
        $this->admin = new Admin();
    }

    public function home()
    {
        $data = [
            'title' => 'Home',
        ];
        echo json_encode($data);
    }
}
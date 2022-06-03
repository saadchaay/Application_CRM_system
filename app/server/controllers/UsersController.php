<?php

    class UsersController extends Controller {

        private $user ;
        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->user = new User();
        }

        public function index()
        {    
            $all_users = $this->user->get_all_users();
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                if($all_users){
                    http_response_code(200);
                    echo json_encode($all_users);
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'No users found'));
                }
            }
        }
        
    }
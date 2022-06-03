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

        public function store()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $data = [
                    'name' => "",
                    'email' => "",
                    'password' => "",
                    'role' => "",
                ];
                if($dataJSON) {

                    $data = [
                        'name' => $dataJSON->name,
                        'email' => $dataJSON->email,
                        'password' => $dataJSON->password,
                        'role' => $dataJSON->role,
                    ];
                }

                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->validation($data, $this->validate_regex);
                    if($errors){
                        echo json_encode(array('errors' => $errors));
                    }else{
                        $result = $this->user->create_user($data);
                        if(!$result){
                            $errors = array('email' => 'Email already exists');
                            echo json_encode(array('errors' => $errors));
                        }else{
                            if($result->status){
                                http_response_code(201);
                                echo json_encode(array('message' => 'User created'));
                            }else{
                                http_response_code(500);
                                echo json_encode(array('message' => 'User not created'));
                            }
                        }
                    }
                }
            }
        }
        
    }
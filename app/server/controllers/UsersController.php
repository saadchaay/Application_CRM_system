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
                    'name' => $dataJSON->name ? $dataJSON->name : "",
                    'email' => $dataJSON->email ? $dataJSON->email : "",
                    'username' => $dataJSON->username ? $dataJSON->username : "",
                    'password' => $dataJSON->password ? $dataJSON->password : "",
                    'confirm_password' => $dataJSON->confirm_password ? $dataJSON->confirm_password : "",
                    'role' => $dataJSON->role ? $dataJSON->role : "",
                    'id' => $dataJSON->id_admin ? $dataJSON->id_admin : "",
                ];
                
                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->validation($data, $this->validate_regex);
                    if($errors){
                        echo json_encode(array('errors' => $errors));
                    }else{
                        $errors = $this->confirmation_password($data);
                        if($errors){
                            echo json_encode(array('errors' => $errors));
                        }else{
                            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                            $result = $this->user->create_user($data);
                            //send email
                            if(!$result){
                                $errors = array('email' => 'Email already exists');
                                echo json_encode(array('errors' => $errors));
                            }else{
                                http_response_code(201);
                                echo json_encode(array('message' => 'User created'));
                            }
                        }
                    }
                }
            }
        }
        
        public function delete($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "DELETE"){
                $result = $this->user->delete_user($id);
                if($result){
                    http_response_code(200);
                    echo json_encode(array('message' => 'User deleted'));
                }else{
                    http_response_code(404);
                    echo json_encode(array('message' => 'User not found'));
                }
            }
        }
    }
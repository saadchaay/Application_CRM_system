<?php

    class ProfileController extends Controller {

        private $admin ;
        private $user ;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->admin = new Admin();
            $this->user = new User();
        }

        public function index()
        {
            
            $all_admins = $this->admin->get_all_admins();
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                echo json_encode($all_admins);
            }

        }

        public function update($id)
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "PUT"){

                $data = [
                    'id' => $id,
                    'name' => $dataJSON->name ? $dataJSON->name : "",
                    'username' => $dataJSON->username ? $dataJSON->username : "",
                    'email' => $dataJSON->email ? $dataJSON->email : "",
                    'phone' => $dataJSON->phone ? $dataJSON->phone : "",
                    'address' => $dataJSON->address ? $dataJSON->address : "",
                    'avatar' => $dataJSON->avatar ? $dataJSON->avatar : "",
                ];
                $role = $dataJSON->role ? $dataJSON->role : "";

                $errors = $this->validation($data, $this->validate_regex);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->exists($data, $this->admin);
                    if($errors){
                        echo json_encode(array('errors' => $errors));
                    }else{
                        if($role == "admin"){
                            $res = $this->admin->update($data, $id);
                        }else{
                            $res = $this->user->update($data, $id);
                        }
                        http_response_code(201);
                        echo json_encode($res);
                    }
                }
                
            }
        }

        public function update_password($id)
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "PUT"){

                $data = [
                    'id' => $id,
                    'type' => $dataJSON->type ? $dataJSON->type : "",
                    'old_password' => $dataJSON->old_password ? $dataJSON->old_password : "",
                    'password' => $dataJSON->new_password ? $dataJSON->new_password : "",
                    'confirm_password' => $dataJSON->confirm_password ? $dataJSON->confirm_password : "",
                ];

                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->confirmation_password($data);
                    if($errors){
                        echo json_encode(array('errors' => $errors));
                    }else{
                        $errors = $this->validate_password($data['password']);
                        if($errors){
                            echo json_encode(array('errors' => $errors));
                        } else {
                            if($data['type'] == "admin"){
                                $errors = $this->admin->get_admin($id);
                                if(!$errors){
                                    echo json_encode(array('errors' => "Admin not found"));
                                }else{
                                    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                                    $res = $this->admin->update_password($data, $id);
                                    if(!$res){
                                        echo json_encode(array('errors' => "The old password is incorrect"));
                                    } else {
                                        http_response_code(201);
                                        echo json_encode($res);
                                    }
                                }
                            } else {
                                $errors = $this->user->get_user($id);
                                if(!$errors){
                                    echo json_encode(array('errors' => "User not found"));
                                }else{
                                    $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                                    $res = $this->user->update_password($data, $id);
                                    if(!$res){
                                        echo json_encode(array('errors' => "The old password is incorrect"));
                                    } else {
                                        http_response_code(201);
                                        echo json_encode($res);
                                    }
                                }
                            } 
                        }
                    }
                }
                
            }
        }

        public function integration()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $data = [
                    'admin' => $dataJSON->admin ? $dataJSON->admin : "",
                    'token' => $dataJSON->token ? $dataJSON->token : "",
                    'clientId' => $dataJSON->clientId ? $dataJSON->clientId : "",
                    'clientSecret' => $dataJSON->clientSecret ? $dataJSON->clientSecret : "",
                    'apiKey' => $dataJSON->apiKey ? $dataJSON->apiKey : "",
                ];
                $integrate = $this->admin->integration($data);
                if($integrate){
                    http_response_code(201);
                    echo json_encode(array('message' => "Integration successful"));
                }else{
                    echo json_encode(array('errors' => "Integration failed"));
                }
            }
        }

        public function getIntegration($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "GET"){
                $integrate = $this->admin->get_integration($id);
                if($integrate){
                    echo json_encode($integrate);
                }else{
                    echo json_encode(array('errors' => "Integration not found"));
                }
            }
        }

        public function deleteIntegration($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "DELETE"){
                $integrate = $this->admin->delete_integration($id);
                if($integrate){
                    echo json_encode(array('message' => "Integration deleted"));
                }else{
                    echo json_encode(array('errors' => "Integration not found"));
                }
            }
        }
    }
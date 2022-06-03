<?php

    class ProfileController extends Controller {

        private $admin ;
        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            $this->admin = new Admin();
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
                ];

                $errors = $this->validation($data, $this->validate_regex);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->exists($data, $this->admin);
                    if($errors){
                        echo json_encode(array('errors' => $errors));
                    }else{
                        $res = $this->admin->update($data, $id);
                        http_response_code(201);
                        echo json_encode($res);
                    }
                }
                
            }
        }
    }
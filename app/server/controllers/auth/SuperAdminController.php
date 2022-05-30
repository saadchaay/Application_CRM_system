<?php

    class SuperAdminController extends Controller {

        private $super_admin;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            
            $this->super_admin = new SuperAdmin();
        }

        public function login()
        {
            $data = json_decode(file_get_contents('php://input'), true);

            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $data = [
                    'username' => $data['username'],
                    'password' => $data['password'],
                ];

                $errors = $this->requirement($data);
                if($errors){
                    echo json_encode(array('errors' => $errors));
                }else{
                    $errors = $this->validation($data, $this->validate_regex);
                    if($errors){

                        echo json_encode(array('errors' => $errors));
                    }else{
                        $errors = $this->login_super_admin($data);
                        if($errors){
                            echo json_encode(array('errors' => $errors));
                        }else{
                            http_response_code(200);
                            echo json_encode($data);
                        }
                    }
                }
            }
        }

    }
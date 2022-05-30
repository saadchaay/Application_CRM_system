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
            $this->admin = new Admin();
        }

        public function index()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));
            $all_admins = $this->admin->get_all_admins();

            if($_SERVER["REQUEST_METHOD"] == "GET"){
                echo json_encode($all_admins);
            }

        }

        public function login()
        {
            $dataJSON = json_decode(file_get_contents("php://input"));

            if($_SERVER["REQUEST_METHOD"] == "POST"){

                $data = [
                    'login' => "",
                    'password' => "",
                ];
                if($dataJSON) {

                    $data = [
                        'login' => $dataJSON->login,
                        'password' => $dataJSON->password,
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
                        $result = $this->super_admin->login_super_admin($data);
                        if(!$result){
                            $errors = array('login_password' => 'Login or password is incorrect');
                            echo json_encode(array('errors' => $errors));
                        }else{
                            if($result->status){
                                http_response_code(201);
                                echo json_encode($result);
                            }else {
                                $errors = array('status' => 'Your Account is not active yet.');
                                echo json_encode(array('errors' => $errors));
                            }
                        }
                    }
                }
            }
        }

    }
<?php

    class ProfileController extends Controller {

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           

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
                    'name' => $dataJSON->name,
                    'username' => $dataJSON->username,
                    'email' => $dataJSON->email,
                    'phone' => $dataJSON->phone,
                    'address' => $dataJSON->address,
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
                            $errors = $this->unique($data);
                            if($errors){
                                echo json_encode(array('errors' => $errors));
                            }else{
                                $this->admin->update($data, $id);
                                http_response_code(201);
                                echo json_encode($data);
                            }
                        }
                    }
                }
            }
        }
    }
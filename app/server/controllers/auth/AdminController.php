<?php

class Pages {
    private $admin;
    
    public function __construct()
    {
        header('Access-Control-Allow-Origin: *');
        header('Content-Type: application/json');
        header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
        header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
        
        $this->admin = new Admin();
    }

    public function register()
    {
        $data = json_decode(file_get_contents("php://input"));
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $data = [
                    "page_title" => "Register",
                    "fullName" => $_POST['fullName'],
                    "email" => trim($_POST['email']),
                    "phone" => trim($_POST['phone']),
                    "username" => trim($_POST['username']),
                    "password" => trim($_POST['password']),
                    "confirmPassword" => trim($_POST['confirmPassword']),
                ];

                $usernameValidation = "/^[a-zA-Z0-9]*$/";
                $fullNameValidation = "/^([a-zA-Z' ]+)$/";
                $passwordValidation = "/^(.{0,7}|[^a-z]*|[^\d]*)$/i";

                if (empty($data['username']) || empty($data["fullName"]) || 
                        empty($data["phone"]) || empty($data["password"]) || 
                            empty($data["confirmPassword"]) || empty($data["email"])) {
                    $data['Errors'] = 'Some field is empty, try again!';
                }

            if($this->admin->register($data)){
                echo json_encode(array("message" => "Admin registered successfully"));
            } else {
                echo json_encode(array("message" => "Admin registration failed"));
            }
        }
        echo json_encode($data);
    }
}
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

    public function register()
    {
        $data = json_decode(file_get_contents("php://input"));
        if($_SERVER["REQUEST_METHOD"] == "POST"){
            $_POST = filter_input_array(INPUT_POST, FILTER_SANITIZE_STRING);
                $data = [
                    "page_title" => "Register",
                    "name" => trim($_POST['name']),
                    "username" => trim($_POST['username']),
                    "email" => trim($_POST['email']),
                    "phone" => trim($_POST['phone']),
                    "address" => trim($_POST['password']),
                ];
                $errors = [
                    "name" => "",
                    "username" => "",
                    "email" => "",
                    "phone" => "",
                    "address" => "",
                ];

                $usernameValidation = "/^[a-zA-Z0-9]*$/";
                $nameValidation = "/^([a-zA-Z' ]+)$/";

                if(empty($data['name'])){
                    $errors['name'] = "Name is required";
                }elseif(!preg_match($nameValidation, $data['name'])){
                    $errors['name'] = "Name must be letters and spaces only";
                }

                if(empty($data['username'])){
                    $errors['username'] = "Username is required";
                }elseif(!preg_match($usernameValidation, $data['username'])){
                    $errors['username'] = "Username must be letters and numbers only";
                }

                if(empty($data['email'])){
                    $errors['email'] = "Email is required";
                }elseif(!filter_var($data['email'], FILTER_VALIDATE_EMAIL)){
                    $errors['email'] = "Email must be a valid email address";
                }

                if(empty($data['phone'])){
                    $errors['phone'] = "Phone is required";
                }elseif(!preg_match("/^[0-9]{10}$/", $data['phone'])){
                    $errors['phone'] = "Phone must be a valid phone number";
                }

                if(empty($data['address'])){
                    $errors['address'] = "Address is required";
                }

                if (empty($data['username']) || empty($data["fullName"]) || 
                            empty($data["confirmPassword"]) || empty($data["email"])) {
                    $data['Errors'] = 'Some field is empty, try again!';
                echo json_encode(array("message" => "Admin registered successfully"));
            } else {
                echo json_encode(array("message" => "Admin registration failed"));
            }
        }
        echo json_encode($data);
    }
}
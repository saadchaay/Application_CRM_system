<?php

class AdminController extends Controller{
    private $admin;
    
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
        $data = [
            'email' => 'yees@email.com',
            'password' => '123456',
            'name' => 'Yees',
            'phone' => '0123456789',
            'username' => 'yees',
            'confirm_password' => '123456',
        ];
        $errors = $this->validation($data, $this->validate_regex) ;

        if(!$errors){
            echo json_encode($errors);
        }else{
            $errors = $this->requirement($data);
            if($errors){
                echo json_encode($errors);
            }else{
                $errors = $this->confirmation_password($data);
                if($errors){
                    echo json_encode($errors);
                }else{
                    $errors = $this->unique($data);
                    if($errors){
                        echo json_encode($errors);
                    }else{
                        echo json_encode($data);
                    }
                }
            }
        }
    }

    public function register()
    {
        $dataJSON = json_decode(file_get_contents("php://input"));

        if($_SERVER["REQUEST_METHOD"] == "POST"){

            $data = [
                'name' => $dataJSON->name,
                'username' => $dataJSON->username,
                'email' => $dataJSON->email,
                'phone' => $dataJSON->phone,
                'address' => $dataJSON->address,
                'password' => $dataJSON->password,
                'confirm_password' => $dataJSON->confirm_password,
            ];

            $email_details = [
                "to" => $data['email'],
                "from" => "contact@growYB.com",
                "subject" => "GROW YB: Email Verification",
                "message" => "verify your account",
            ];

            $errors = $this->requirement($data);
            if($errors){
                // http_response_code(400);
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
                            $data['password'] = password_hash($data['password'], PASSWORD_DEFAULT);
                            $this->admin->register($data);
                            // mail($email_details['to'], $email_details['subject'], $email_details['message']);
                            http_response_code(201);
                            echo json_encode($data);
                        }
                    }
                }
            }
        }
    }


    public function unique($data)
    {
        $errors = [];
        foreach ($data as $key => $value) {
            if(!empty($value)){
                if($key == 'email'){
                    $check = $this->admin->check_email($value);
                    if($check){
                        $errors[$key] = ucfirst($key) . ' is already exist';
                    }
                }else if($key == 'username'){
                    $check = $this->admin->check_username($value);
                    if($check){
                        $errors[$key] = ucfirst($key) . ' is already exist';
                    }
                }
            }
        }
        return $errors;
    }
}
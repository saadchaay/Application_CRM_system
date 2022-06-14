<?php

class LoginController extends Controller{
    
    private $admin;
    private $user;

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
        $data = [
            'title' => 'Home',
        ];
        echo json_encode($data);
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
                    $admin_login = $this->admin->login($data);
                    $user_login = $this->user->login($data);
                    if(!$admin_login && !$user_login){
                        $errors = array('login_password' => 'Login or password is incorrect');
                        echo json_encode(array('errors' => $errors));
                    }else{
                        if($user_login) {
                            http_response_code(201);
                            echo json_encode($user_login);
                        }elseif(isset($admin_login->status) && $admin_login->status == 1){
                            $integration = $this->admin->get_integration($admin_login->id);
                            if($integration){
                                http_response_code(201);
                                echo json_encode(array('admin' => $admin_login, 'integration' => $integration));
                            } else {
                                http_response_code(201);
                                echo json_encode(array('admin' => $admin_login));
                            }
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
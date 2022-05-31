<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;

// require_once 'path/to/PHPMailer/src/Exception.php';
// require_once "path/to/PHPMailer/src/PHPMailer.php";
require 'vendor/autoload.php';

    class SuperAdminController extends Controller {

        private $super_admin;
        private $admin;
        private $mail;

        public function __construct()
        {
            header('Access-Control-Allow-Origin: *');
            header('Content-Type: application/json');
            header('Access-Control-Allow-Methods: POST,GET,DELETE,PUT');
            header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');           
            
            $this->super_admin = new SuperAdmin();
            $this->admin = new Admin();
            $this->mail = new PHPMailer(true);
        }

        public function index()
        {
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

        public function changeStatus($id)
        {
            if($_SERVER["REQUEST_METHOD"] == "PUT") {
                $result = $this->super_admin->change_status($id);
                if($result){

                    http_response_code(201);
                    echo json_encode(array('message' => 'Status changed'));
                }else{
                    http_response_code(500);
                    echo json_encode(array('message' => 'Status not changed'));
                }
            }
        }

        public function mail_activation()
        {
            if($_SERVER["REQUEST_METHOD"] == "GET") {
                try {
                    //Server settings
                    $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;
                    $this->mail->isSMTP();
                    $this->mail->Host = 'localhost';
                    $this->mail->SMTPAuth = false;
                    $this->mail->SMTPAutoTLS = false; 
                    $this->mail->Port = 25;
                    
                    // $this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
                    // $this->mail->isSMTP();                                            //Send using SMTP
                    // $this->mail->Host       = 'localhost';                     //Set the SMTP server to send through
                    // $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
                    // $this->mail->Username   = 'user@example.com';                     //SMTP username
                    // $this->mail->Password   = 'secret';                               //SMTP password
                    // $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;            //Enable implicit TLS encryption
                    // $this->mail->Port       = 465;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
                
                    //Recipients
                    $this->mail->setFrom('from@example.com', 'Mailer');
                    $this->mail->addAddress('saadchaay27@gmail.com', 'Saad chaay');     //Add a recipient
                    // $this->mail->addAddress('ellen@example.com');               //Name is optional
                    $this->mail->addReplyTo('info@example.com', 'Information');
                    $this->mail->addCC('cc@example.com');
                    $this->mail->addBCC('bcc@example.com');
                
                    //Content
                    $this->mail->isHTML(true);                                  //Set email format to HTML
                    $this->mail->Subject = 'Here is the subject';
                    $this->mail->Body    = 'This is the HTML message body <b>in bold!</b>';
                    $this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
                
                    $this->mail->send();
                    echo json_encode(array('message' => 'Message has been sent'));
    
                } catch (Exception $e) {
                    echo json_encode(array('message' => 'Message could not be sent. Mailer Error: '. $this->mail->ErrorInfo));
                }
            }
        }

    }
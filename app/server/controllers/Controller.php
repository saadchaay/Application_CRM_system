<?php

    //phpMailer
require __DIR__.'/../PHPMailer/PHPMailer.php';
require __DIR__.'/../PHPMailer/SMTP.php';
require __DIR__.'/../PHPMailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;

    class Controller {

        private $admin ;

        protected $validate_regex = [
            'login' => '/^[a-zA-Z0-9]*$/',
            'email' => '/^[a-zA-Z0-9]*$/',
            'password' => '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/',
            'name' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'phone' => '/^[0-9]{10}$/',
            'username' => '/^[a-zA-Z0-9]*$/',
            'confirm_password' => '/^\S*(?=\S{8,})(?=\S*[a-z])(?=\S*[A-Z])(?=\S*[\d])\S*$/',
            'address' => '/^([a-zA-Z0-9' . "'" . ' ]+)$/',
        ];

        public function validation($data)
        {
            $errors = [];
            foreach ($data as $key => $value) {
                if($key != 'confirm_password' && $key != 'login'){
                    if($key == 'email' && $key != 'login'){
                        if(!filter_var($value, FILTER_VALIDATE_EMAIL)){
                            $errors[$key] = ucfirst($key) ." is not valid";
                        }
                    }else {
                        if (!preg_match($this->validate_regex[$key], $value)) {
                            $errors[$key] = ucfirst($key) ." is not valid";
                        }
                    }
                }elseif($key == 'login') {
                    if(!preg_match($this->validate_regex['username'], $value) && !filter_var($value, FILTER_VALIDATE_EMAIL)){
                        $errors[$key] = ucfirst($key) ." is not valid";
                    }
                }
            }
            return $errors;
        }

        public function requirement($data)
        {
            $errors = [];
            foreach ($data as $key => $value) {
                if($key !== 'confirm_password'){
                    if(empty($value)){
                        $errors[$key] = ucfirst($key) . ' is required';
                    }
                }
            }
            return $errors;
        }

        public function confirmation_password($data)
        {
            $errors = [];
            if(!empty($data['confirm_password'])){
                if($data['confirm_password'] != $data['password']){
                    $errors['confirm_password'] = 'Confirm password must be same as password';
                }
            }
            return $errors;
        }

        public function sendEmail($data) {
            $mail = new PHPMailer(true); 
            
            $body="Hello $data->name,\nThanks for registration!\n\nYour Account is activated.\n\nIf you have any question, contact our support: support@grow-yb.com\n\nThanks,\nGROW YB";

            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth= "true";
            $mail->SMTPSecure = "tls";
            $mail->port="587";
            $mail->Username = "saad.chaay@cloudlink.us";
            $mail->Password = "Maggie@7223";
            $mail->Subject = "GROW YB: Activation your account";
            $mail->setFrom("saad.chaay@cloudlink.us");
            $mail->Body = $body;
            $mail->addAddress($data->email);//sent To
            $mail->Send() ;
            $mail->smtpClose();
            
            return $mail;
        }

        
    }
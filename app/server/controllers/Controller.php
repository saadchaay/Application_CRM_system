<?php

    //phpMailer
require __DIR__.'/../PHPMailer/PHPMailer.php';
require __DIR__.'/../PHPMailer/SMTP.php';
require __DIR__.'/../PHPMailer/Exception.php';
use PHPMailer\PHPMailer\PHPMailer;

    class Controller {
        
        protected $validate_regex = [
            'id' => '/^[0-9]+$/',
            'id_creator' => '/^[0-9]+$/',
            'category' => '/^[0-9]+$/',
            'type' => '/^[a-zA-Z]+$/',
            'price' => '/^[0-9]+(\.[0-9]{1,2})?$/',
            'quantity' => '/^[0-9]+$/',
            'title' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'description' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'role' => '/^([a-zA-Z' . "'" . ' ]+)$/',
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
                if(!empty($value)){
                    if($key != 'confirm_password' && $key != 'login' && $key != 'properties' && $key != 'avatar'){
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
            }
            return $errors;
        }

        public function validate_password($value)
        {
            $errors = [];
            if(!preg_match($this->validate_regex['password'], $value)){
                $errors = "Password is not valid";
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
                if($key == 'old_password'){
                    if(empty($value)){
                        $errors[$key] = 'Old Password is required';
                    }
                }
            }
            return $errors;
        }

        public function confirmation_password($data)
        {
            $errors = [];
            if($data['confirm_password'] != $data['password']){
                $errors['confirm_password'] = 'Confirm password must be same as password';
            }
            return $errors;
        }

        public function sendEmail($data) {
            $mail = new PHPMailer(true); 
            
            $mail->isSMTP();
            $mail->Host = "smtp.gmail.com";
            $mail->SMTPAuth= "true";
            $mail->SMTPSecure = "tls";
            $mail->port="587";
            $mail->Username = "saad.chaay@cloudlink.us";
            $mail->Password = "Maggie@7223";
            $mail->Subject = "GROW YB: Activation your account";
            $mail->setFrom("saad.chaay@cloudlink.us");
            $mail->Body = $data["body"];
            $mail->addAddress($data["admin"]->email);//sent To
            $mail->Send() ;
            $mail->smtpClose();
            
            return $mail;
        }

        public function unique($data, $admin)
        {
            $errors = [];
            foreach ($data as $key => $value) {
                if(!empty($value)){
                    if($key == 'email'){
                        $check = $admin->check_email($value);
                        if($check){
                            $errors[$key] = ucfirst($key) . ' is already exist';
                        }
                    }else if($key == 'username'){
                        $check = $admin->check_username($value);
                        if($check){
                            $errors[$key] = ucfirst($key) . ' is already exist';
                        }
                    }
                }
            }
            return $errors;
        }

        public function exists($data, $admin)
        {
            $errors = [];
            if($data){
                $check = $admin->exists_user($data);
                if($check){
                    $errors = 'Email or Username is already taken';
                }
            }
            return $errors;
        }
        
    }

?>
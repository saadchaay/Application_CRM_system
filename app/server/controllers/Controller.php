<?php

    

    class Controller {

        private $admin ;

        protected $validate_regex = [
            'email' => '/^[a-zA-Z0-9]*$/',
            'password' => '/^[a-zA-Z0-9]*$/',
            'name' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'phone' => '/^[0-9]{10}$/',
            'username' => '/^[a-zA-Z0-9]*$/',
            'confirm_password' => '/^[a-zA-Z0-9]*$/',
            'address' => '/^([a-zA-Z0-9' . "'" . ' ]+)$/',
        ];

        public function validation($data)
        {
            $errors = [];
            foreach ($data as $key => $value) {
                if($key == 'email'){
                    if(!filter_var($value, FILTER_VALIDATE_EMAIL)){
                        $errors[$key] = ucfirst($key) ." is not valid";
                    }
                }else {
                    if (!preg_match($this->validate_regex[$key], $value)) {
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
                if(empty($value)){
                    $errors[$key] = ucfirst($key) . ' is required';
                }
            }
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

        
    }
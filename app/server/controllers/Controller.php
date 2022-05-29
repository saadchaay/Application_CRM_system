<?php

    

    class Controller {

        private $admin ;
        protected $validate_regex = [
            'email' => '/^[a-zA-Z0-9]*$/',
            'password' => '/^(.{0x,7}|[^a-z]*|[^\d]*)$/i',
            'name' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'phone' => '/^[0-9]{10}$/',
            'username' => '/^[a-zA-Z0-9]*$/',
            'confirm_password' => '/^(.{0,7}|[^a-z]*|[^\d]*)$/i',
        ];

        public function __construct(){
            $this->admin = new Admin();
        }

        public function validation($data, $validation)
        {
            $errors = [];
            foreach ($validation as $key => $value) {
                if(!empty($value)){
                    if(!preg_match($value, $data[$key])){
                        $errors[$key] = ucfirst($key) . ' is not valid';
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

        public function unique($data)
        {
            $errors = [];
            foreach ($data as $key => $value) {
                if(!empty($value)){
                    // $check = false ;
                    $check = $this->admin->check_unique($key, $value);
                    if($check){
                        $errors[$key] = ucfirst($key) . ' already exists';
                    }
                }
            }
        }
    }
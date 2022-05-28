<?php

 

    class Controller {

        protected $validate_regex = [
            'email' => '/^[a-zA-Z0-9]*$/',
            'password' => '/^(.{0x,7}|[^a-z]*|[^\d]*)$/i',
            'name' => '/^([a-zA-Z' . "'" . ' ]+)$/',
            'phone' => '/^[0-9]{10}$/',
            'username' => '/^[a-zA-Z0-9]*$/',
            'confirmPassword' => '/^(.{0,7}|[^a-z]*|[^\d]*)$/i',
        ];

        public function validation($data, $validation)
        {
            $errors = [];
            foreach ($validation as $key => $value) {
                if(!empty($value)){
                    if(!preg_match($value, $data[$key])){
                        $errors[$key] = $key . ' must be ' . $value;
                    }
                }
            }
            return $errors;
        }

    }
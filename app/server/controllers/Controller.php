<?php

    require '../helpers/lang/validation.php';
    require_once '../helpers/lang/regex.php';
    print_r($lang);
    
    class Controller {

        protected $validation = [];

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
<?php

    require '../helpers/lang/validation.php';
    require '../helpers/lang/regex.php';

    class Controller {

        protected $validate = [];

        public function validation($data)
        {
            $validation = new Validation();
            $validation->validate($data, $this->validate);
        }

    }
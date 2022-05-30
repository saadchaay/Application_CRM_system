<?php

    class SuperAdminController extends Controller {

        private $super_admin;

        public function __construct()
        {
            $this->super_admin = new SuperAdmin();
        }

        

    }
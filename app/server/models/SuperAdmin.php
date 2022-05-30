<?php 

    class SuperAdmin {

        private $db;

        public function __construct()
        {
            $this->db = new Database();
        }
        
        public function login_super_admin($data)
        {
            $this->db->query("SELECT * FROM `admins` WHERE `username` = :username OR `email` = :email");

            $this->db->bind(":username", $data["username"]);
            $this->db->bind(":email", $data["username"]);

            $row = $this->db->single();
            if($row) {
                if(password_verify($data["password"], $row->password)) {
                    return $row;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }


    }
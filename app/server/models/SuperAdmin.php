<?php 

    class SuperAdmin {

        private $db;

        public function __construct()
        {
            $this->db = new Database();
        }
        
        public function login_super_admin($data)
        {
            $this->db->query("SELECT * FROM `super-admin` WHERE `username` = :username OR `email` = :email");

            $this->db->bind(":username", $data["login"]);
            $this->db->bind(":email", $data["login"]);

            $row = $this->db->single();
            if($row) {
                if(password_verify($data["password"], $row->password) && $row->is_super == true) {
                    return $row;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        public function change_status($id)
        {
            $this->db->query("UPDATE `admins` SET `status` = NOT `status` WHERE `id` = :id");
            $this->db->bind(":id", $id);
            $res = $this->db->execute();
            if($res) {
                return true;
            } else {
                return false;
            }
        }


    }
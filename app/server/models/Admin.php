<?php

class Admin {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_admins()
    {
        $this->db->query('SELECT * FROM admins WHERE is_super != 1 ORDER BY id DESC');
        return $this->db->resultSet();
    }

    public function register($data)
    {
        //create a query
        // $this->db->query("INSERT INTO `admins` VALUES (:name, :username, :email, :phone, :password, :status)");
        $this->db->query("INSERT INTO `admins` (`name`, `username`, `email`, `phone`, `address`, `password`, `status`) VALUES (:name, :username, :email, :phone, :address, :password, :status)");
        // bind the values
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":username", $data["username"]);
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":phone", $data["phone"]);
        $this->db->bind(":address", $data["address"]);
        $this->db->bind(":password", $data["password"]);
        $this->db->bind(":status", false);

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function login($data)
    {
        $this->db->query("SELECT * FROM `admins` WHERE `username` = :username OR `email` = :email");

        $this->db->bind(":username", $data["login"]);
        $this->db->bind(":email", $data["login"]);

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

    public function check_email($email)
    {
        $this->db->query("SELECT * FROM admins WHERE email = :email");
        $this->db->bind(":email", $email);
        $row = $this->db->single();
        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

    public function check_username($username)
    {
        $this->db->query("SELECT * FROM admins WHERE username = :username");
        $this->db->bind(":username", $username);
        $row = $this->db->single();
        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
    }

}
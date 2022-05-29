<?php

class Admin {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function allAdmins()
    {
        $this->db->query('SELECT * FROM admins');
        return $this->db->resultSet();
    }

    public function register($data)
    {
        //create a query
        $this->db->query("INSERT INTO `admins` VALUES (:name, :username, :email, :phone, :password, :status)");

        // bind the values
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":username", $data["username"]);
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":phone", $data["phone"]);
        $this->db->bind(":password", $data["password"]);
        $this->db->bind(":status", false);

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function check_unique($key, $data)
    {
        $status = false;
        $this->db->query("SELECT * FROM `admins` WHERE `$key` = :$key");
        $this->db->bind(":$key", $data);
        $result = $this->db->resultSet();
        if (count($result) > 0) {
            $status = true;
        }
        return $status;
    }
}
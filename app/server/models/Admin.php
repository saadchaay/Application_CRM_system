<?php

class Admin {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_admins()
    {
        $this->db->query('SELECT * FROM users WHERE ORDER BY id DESC');
        return $this->db->resultSet();
    }

    public function get_admin($id)
    {
        $this->db->query('SELECT * FROM users WHERE id = :id');
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function register($data)
    {
        //create a query

        $this->db->query("INSERT INTO `users` (`name`, `username`, `email`, `phone`, `address`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES (:name, :username, :email, :phone, :address, :password, :role, :status, :created_at, :updated_at)");
        
        // bind the values
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":username", $data["username"]);
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":phone", $data["phone"]);
        $this->db->bind(":address", $data["address"]);
        $this->db->bind(":password", $data["password"]);
        $this->db->bind(":status", false);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        if(!$data["role"]) {
            $this->db->bind(":role", "admin");
        } else {
            $this->db->bind(":role", $data["role"]);
        }

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function login($data)
    {
        $this->db->query("SELECT * FROM `users` WHERE `username` = :username OR `email` = :email");

        $this->db->bind(":username", $data["login"]);
        $this->db->bind(":email", $data["login"]);

        $row = $this->db->single();
        if($row) {
            if((password_verify($data["password"], $row->password))) {
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

    public function delete($id)
    {
        $this->db->query("DELETE FROM admins WHERE id = :id");
        $this->db->bind(":id", $id);

        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
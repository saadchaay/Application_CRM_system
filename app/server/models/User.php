<?php

class User {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_users($id)
    {
        $this->db->query('SELECT * FROM users WHERE id_admin = :id ORDER BY id DESC');
        $this->db->bind(':id', $id);
        return $this->db->resultSet();
    }

    public function login($data)
    {
        $this->db->query("SELECT * FROM `admins` WHERE `username` = :username OR `email` = :email");

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


    public function create_user($data)
    {
        //create a query
        $this->db->query("INSERT INTO `users` (`id_admin`, `name`, `username`, `email`, `password`, `role`, `status`, `created_at`, `updated_at`) VALUES (:id, :name, :username, :email, :password, :role, :status, :created_at, :updated_at)");
        
        // bind the values
        $this->db->bind(":id", $data["id"]);
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":username", $data["username"]);
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":password", $data["password"]);
        $this->db->bind(":status", true);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));
        $this->db->bind(":role", $data["role"]);

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete_user($id)
    {
        $this->db->query("DELETE FROM `users` WHERE `id` = :id");
        $this->db->bind(":id", $id);
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }



    
}
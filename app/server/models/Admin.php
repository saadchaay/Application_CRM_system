<?php

class Admin {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function get_all_admins()
    {
        $this->db->query('SELECT * FROM users ORDER BY id DESC');
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
        $this->db->bind(":role", $data["role"]);

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
        $this->db->query("SELECT * FROM users WHERE email = :email");
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
        $this->db->query("SELECT * FROM users WHERE username = :username");
        
        $this->db->bind(":username", $username);
        $row = $this->db->single();

        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }
        return $username;
    }

    public function exists_user($data)
    {
        $this->db->query("SELECT * FROM users WHERE (username = :username OR email = :email) AND id != :id");
        $this->db->bind(":username", $data["username"]);
        $this->db->bind(":email", $data["email"]);
        $this->db->bind(":id", $data["id"]);

        $row = $this->db->single();
        if ($this->db->rowCount() > 0) {
            return true;
        } else {
            return false;
        }    
    }

    public function update($data, $id)
    {
        $user = $this->get_admin($id);
        $this->db->query("UPDATE `users` SET `name` = :name, `username` = :username, `email` = :email, `phone` = :phone, `address` = :address, `updated_at` = :updated_at WHERE `id` = :id");

        $this->db->bind(":name", ($data["name"]) ? $data["name"] : $user->name);
        $this->db->bind(":username", ($data["username"]) ? $data["username"] : $user->username);
        $this->db->bind(":email", ($data["email"]) ? $data["email"] : $user->email);
        $this->db->bind(":phone", ($data["phone"]) ? $data["phone"] : $user->phone);
        $this->db->bind(":address", ($data["address"]) ? $data["address"] : $user->address);
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));
        $this->db->bind(":id", $id);
        $this->db->execute();
        $res = $this->get_admin($id);
        if ($res) {
            return $res;
        } else {
            return false;
        }
    }

    public function update_password($data, $id)
    {
        $user = $this->get_admin($id);
        if($user) {
            if(password_verify($data["old_password"], $user->password)) {
                $this->db->query("UPDATE `users` SET `password` = :password, `updated_at` = :updated_at WHERE `id` = :id");
                $this->db->bind(":password", $data["password"]);
                $this->db->bind(":updated_at", date("Y-m-d H:i:s"));
                $this->db->bind(":id", $id);
                $this->db->execute();
                $res = $this->get_admin($id);
                if ($res) {
                    return $res;
                } else {
                    return false;
                }
            } else {
                return false;
            }
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
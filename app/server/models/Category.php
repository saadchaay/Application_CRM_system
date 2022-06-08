<?php

class Category {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->user = new User();
    }
    
    public function get_all_category($data)
    {
        ( $data['type'] === 'admin' ) ? 
            $this->db->query("SELECT * FROM `categories` WHERE `id_admin` = :id AND type_creator = :type ORDER BY id DESC") : 
            $this->db->query("SELECT * FROM `categories` WHERE `id_user` = :id AND type_creator = :type ORDER BY id DESC");
        $this->db->bind(':id', $data['id']);
        $this->db->bind(':type', $data['type']);
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }
    
    public function get_category($id)
    {
        $this->db->query('SELECT * FROM categories WHERE id = :id');
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }    
    }

    public function create_category($data)
    {
        
        if( $data['type'] === 'admin' ) {
            $this->db->query("INSERT INTO `categories` (`id_admin`, `type_creator`, `title`, `description`, `created_at`, `updated_at`) VALUES (:id, :type, :title, :description, :created_at, :updated_at)");
            $this->db->bind(":id", $data["id_creator"]);
        } else {
            $id_admin = $this->user->get_user($data['id_creator'])->id_admin;
            $this->db->query("INSERT INTO `categories` (`id_admin`, `id_user`, `type_creator`, `title`, `description`, `created_at`, `updated_at`) VALUES (:id_admin, :id_user, :type, :title, :description, :created_at, :updated_at)");
            $this->db->bind(":id_admin", $id_admin);
            $this->db->bind(":id_user", $data["id_creator"]);
        }
        $this->db->bind(":type", $data["type"]);
        $this->db->bind(":title", $data["title"]);
        $this->db->bind(":description", $data["description"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function update_category($id, $data)
    {
        //create a query
        if( $data['type'] === 'admin' ) {
            $this->db->query("UPDATE `categories` SET `type_creator` = :type, `title` = :title, `description` = :description, `updated_at` = :updated_at WHERE `id` = :id");
        } else {
            $this->db->query("UPDATE `categories` SET `id_user` = :id_user, `type_creator` = :type, `title` = :title, `description` = :description, `updated_at` = :updated_at WHERE `id` = :id");
            $this->db->bind(":i d_user", $data["id_creator"]);
        }
        // bind the values
        $this->db->bind(":id", $id);
        $this->db->bind(":type", $data["type"]);
        $this->db->bind(":title", $data["title"]);
        $this->db->bind(":description", $data["description"]);
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function delete_category($id)
    {
        $this->db->query("DELETE FROM `categories` WHERE id = :id");
        $this->db->bind(":id", $id);
        if($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
<?php

class Category {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
    }

    public function store($data)
    {
        //create a query
        $this->db->query("INSERT INTO `categories` (`name`, `created_at`, `updated_at`) VALUES (:name, :created_at, :updated_at)");

        // bind the values
        $this->db->bind(":name", $data["name"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function get_all_category($data)
    {
        $this->db->query('SELECT * FROM categories WHERE id_creator = :id AND type_creator = :type ORDER BY id DESC');
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
        //create a query
        $this->db->query("INSERT INTO `categories` (`id_creator`, `type_creator`, `title`, `description`, `created_at`, `updated_at`) VALUES (:id_creator, :type_creator, :title, :description, :created_at, :updated_at)");

        // bind the values
        $this->db->bind(":id_creator", $data["id_creator"]);
        $this->db->bind(":type_creator", $data["type"]);
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
        $this->db->query("UPDATE `categories` SET `id_creator` = :creator AND `type_creator` = :type AND `title` = :title AND `description` = :description AND `updated_at` = :updated_at WHERE `id` = :id");

        // bind the values
        $this->db->bind(":id", $id);
        $this->db->bind(":creator", $data["id_creator"]);
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
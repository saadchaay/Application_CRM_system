<?php

class Product {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->property = new Property();
        $this->user = new User();
    }
    
    public function get_all_product($data)
    {
        ($data['type'] === 'admin') ?  $this->db->query("SELECT * FROM `products` INNER JOIN `categories` ON `products`.id_category = `categories`.id WHERE  `id_admin` = :id ORDER BY id DESC")
            : $this->db->query("SELECT * FROM `products` INNER JOIN `categories` ON `products`.id_category = `categories`.id WHERE  `id_user` = :id ORDER BY id DESC");
        
        $this->db->bind(':id', $data['id']);
        
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }

    public function get_product($id)
    {
        $this->db->query("SELECT * FROM `products` WHERE `id` = :id");
        $this->db->bind(':id', $id);
        if($this->db->single()) {
            return $this->db->single();
        } else {
            return false;
        }
    }

    public function create_product($data)
    {
        if( $data['type'] === 'admin' ) {
            $this->db->query("INSERT INTO `products` 
                (`id_admin`, `type_creator`, `id_category`, `title`, `description`, `quantity`, `status`, `price`, `avatar`, `created_at`, `updated_at`) 
                VALUES (:id, :type, :category, :title, :description, :quantity, :status, :price, :avatar, :created_at, :updated_at)");
            $this->db->bind(":id", $data["id_creator"]);
        } else {
            $id_admin = $this->user->get_user($data['id_creator'])->id_admin;
            $this->db->query("INSERT INTO `products` 
                (`id_admin`, `id_user`, `type_creator`, `id_category`, `title`, `description`, `quantity`, `status`, `price`, `avatar`, `created_at`, `updated_at`) 
                VALUES (:id_admin, :id_user, :type, :category, :title, :description, :quantity, :status, :price, :avatar, :created_at, :updated_at)");
            $this->db->bind(":id_admin", $id_admin);
            $this->db->bind(":id_user", $data["id_creator"]);
        }
        $this->db->bind(":type", $data["type"]);
        $this->db->bind(":category", $data["category"]);
        $this->db->bind(":title", $data["title"]);
        $this->db->bind(":description", $data["description"]);
        $this->db->bind(":quantity", $data["quantity"]);
        $this->db->bind(":status", $data["status"]);
        $this->db->bind(":price", $data["price"]);
        $this->db->bind(":avatar", $data["avatar"]);
        $this->db->bind(":created_at", date("Y-m-d H:i:s"));
        $this->db->bind(":updated_at", date("Y-m-d H:i:s"));

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }

    public function change_status($data)
    {
        $this->db->query("UPDATE `products` SET `status` = :status WHERE `id` = :id");
        $this->db->bind(":status", $data["status"]);
        $this->db->bind(":id", $data["id"]);

        // check execution the query
        if ($this->db->execute()) {
            return true;
        } else {
            return false;
        }
    }
}
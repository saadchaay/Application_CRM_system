<?php

class Product {
    private $db;

    public function __construct()
    {
        $this->db = new Database();
        $this->property = new Property();
    }
    
    public function get_all_product($data)
    {
        ($data['type'] === 'admin') ?  $this->db->query("SELECT * FROM `products` WHERE `id_admin` = :id ORDER BY id DESC")
            : $this->db->query("SELECT * FROM `products` WHERE `id_user` = :id ORDER BY id DESC");
        
        $this->db->bind(':id', $data['id']);
        
        if($this->db->resultSet()) {
            return $this->db->resultSet();
        } else {
            return false;
        }
    }

    public function create_product($data)
    {
        if( $data['type'] === 'admin' ) {
            $this->db->query("INSERT INTO `products` (`id_admin`, `type_creator`, `title`, `description`, `created_at`, `updated_at`) VALUES (:id, :type, :title, :description, :created_at, :updated_at)");
            $this->db->bind(":id", $data["id_creator"]);
        } else {
            $id_admin = $this->user->get_user($data['id_creator'])->id_admin;
            $this->db->query("INSERT INTO `products` (`id_admin`, `id_user`, `type_creator`, `title`, `description`, `created_at`, `updated_at`) VALUES (:id_admin, :id_user, :type, :title, :description, :created_at, :updated_at)");
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
}